import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Member from "@/models/Member"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log("API: Fetching member with ID:", params.id)

    await connectToDatabase()
    const member = await Member.findOne({ member_id: Number.parseInt(params.id) })

    console.log("API: Found member:", member)

    if (!member) {
      return NextResponse.json({ success: false, message: "Member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: member })
  } catch (error) {
    console.error("Error fetching member:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch member" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    await connectToDatabase()

    const member = await Member.findOneAndUpdate({ member_id: Number.parseInt(params.id) }, body, {
      new: true,
      runValidators: true,
    })

    if (!member) {
      return NextResponse.json({ success: false, message: "Member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: member })
  } catch (error) {
    console.error("Error updating member:", error)
    return NextResponse.json({ success: false, message: "Failed to update member" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()

    const member = await Member.findOneAndDelete({ member_id: Number.parseInt(params.id) })

    if (!member) {
      return NextResponse.json({ success: false, message: "Member not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    console.error("Error deleting member:", error)
    return NextResponse.json({ success: false, message: "Failed to delete member" }, { status: 500 })
  }
}
