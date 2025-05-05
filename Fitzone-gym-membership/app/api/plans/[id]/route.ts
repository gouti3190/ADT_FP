import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import Plan from "@/models/Plan"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const plan = await Plan.findOne({ plan_id: Number.parseInt(params.id) })

    if (!plan) {
      return NextResponse.json({ success: false, message: "Plan not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: plan })
  } catch (error) {
    console.error("Error fetching plan:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch plan" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()

    await connectToDatabase()

    const plan = await Plan.findOneAndUpdate({ plan_id: Number.parseInt(params.id) }, body, {
      new: true,
      runValidators: true,
    })

    if (!plan) {
      return NextResponse.json({ success: false, message: "Plan not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: plan })
  } catch (error) {
    console.error("Error updating plan:", error)
    return NextResponse.json({ success: false, message: "Failed to update plan" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()

    const plan = await Plan.findOneAndDelete({ plan_id: Number.parseInt(params.id) })

    if (!plan) {
      return NextResponse.json({ success: false, message: "Plan not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    console.error("Error deleting plan:", error)
    return NextResponse.json({ success: false, message: "Failed to delete plan" }, { status: 500 })
  }
}
