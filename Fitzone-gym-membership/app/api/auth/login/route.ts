import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    await connectToDatabase()

    // Find user
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Error logging in:", error)
    return NextResponse.json({ success: false, message: "Failed to login" }, { status: 500 })
  }
}
