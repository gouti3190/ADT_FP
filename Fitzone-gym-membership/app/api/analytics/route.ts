import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Member from "@/models/Member"
import Attendance from "@/models/Attendance"
import Payment from "@/models/Payment"

export async function GET() {
  try {
    await connectToDatabase()

    // Fetch all members with their DOB
    const members = await Member.find({}).select("member_id first_name last_name dob")

    // Calculate age distribution
    const ageDistribution = calculateAgeDistribution(members)

    // Fetch payment data grouped by plan
    const paymentsByPlan = await Payment.aggregate([
      {
        $lookup: {
          from: "plans",
          localField: "plan_id",
          foreignField: "plan_id",
          as: "plan",
        },
      },
      {
        $unwind: "$plan",
      },
      {
        $group: {
          _id: "$plan.plan_name",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          plan: "$_id",
          totalAmount: 1,
          averageAmount: { $divide: ["$totalAmount", "$count"] },
          count: 1,
        },
      },
    ])

    // Fetch attendance data grouped by member
    const attendanceByMember = await Attendance.aggregate([
      {
        $group: {
          _id: "$member_id",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "members",
          localField: "_id",
          foreignField: "member_id",
          as: "member",
        },
      },
      {
        $unwind: "$member",
      },
      {
        $project: {
          member_id: "$_id",
          name: { $concat: ["$member.first_name", " ", "$member.last_name"] },
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10, // Limit to top 10 members
      },
    ])

    return NextResponse.json({
      success: true,
      data: {
        ageDistribution,
        paymentsByPlan,
        attendanceByMember,
      },
    })
  } catch (error) {
    console.error("Error fetching analytics data:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch analytics data" }, { status: 500 })
  }
}

// Helper function to calculate age distribution
function calculateAgeDistribution(members: any[]) {
  const ageGroups = {
    "Under 18": 0,
    "18-24": 0,
    "25-34": 0,
    "35-44": 0,
    "45-54": 0,
    "55-64": 0,
    "65+": 0,
  }

  const today = new Date()

  members.forEach((member) => {
    if (!member.dob) return

    const dob = new Date(member.dob)
    let age = today.getFullYear() - dob.getFullYear()

    // Adjust age if birthday hasn't occurred yet this year
    if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
      age--
    }

    if (age < 18) ageGroups["Under 18"]++
    else if (age < 25) ageGroups["18-24"]++
    else if (age < 35) ageGroups["25-34"]++
    else if (age < 45) ageGroups["35-44"]++
    else if (age < 55) ageGroups["45-54"]++
    else if (age < 65) ageGroups["55-64"]++
    else ageGroups["65+"]++
  })

  return Object.entries(ageGroups).map(([name, value]) => ({
    name,
    value,
  }))
}
