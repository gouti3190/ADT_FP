import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Member from "@/models/Member"

export async function GET() {
  try {
    await connectToDatabase()
    const members = await Member.find({}).sort({ member_id: 1 })

    return NextResponse.json({ success: true, data: members })
  } catch (error) {
    console.error("Error fetching members:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch members" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    await connectToDatabase()

    // Check if member with this ID already exists
    const existingMember = await Member.findOne({ member_id: body.member_id })
    if (existingMember) {
      return NextResponse.json({ success: false, message: "A member with this ID already exists" }, { status: 400 })
    }

    // Check if email is already in use
    const emailExists = await Member.findOne({ email: body.email })
    if (emailExists) {
      return NextResponse.json({ success: false, message: "A member with this email already exists" }, { status: 400 })
    }

    // Check if phone is already in use
    const phoneExists = await Member.findOne({ phone: body.phone })
    if (phoneExists) {
      return NextResponse.json(
        { success: false, message: "A member with this phone number already exists" },
        { status: 400 },
      )
    }

    const member = await Member.create(body)

    return NextResponse.json({ success: true, data: member }, { status: 201 })
  } catch (error) {
    console.error("Error creating member:", error)
    return NextResponse.json({ success: false, message: `Failed to create member: ${error.message}` }, { status: 500 })
  }
}
