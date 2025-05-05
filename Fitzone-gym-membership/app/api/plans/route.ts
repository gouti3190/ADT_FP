import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Plan from "@/models/Plan"

export async function GET() {
  try {
    await connectToDatabase()
    const plans = await Plan.find({}).sort({ plan_id: 1 })

    return NextResponse.json({ success: true, data: plans })
  } catch (error) {
    console.error("Error fetching plans:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch plans" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    await connectToDatabase()

    const plan = await Plan.create(body)

    return NextResponse.json({ success: true, data: plan }, { status: 201 })
  } catch (error) {
    console.error("Error creating plan:", error)
    return NextResponse.json({ success: false, message: "Failed to create plan" }, { status: 500 })
  }
}
