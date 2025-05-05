import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    await connectToDatabase()

    // Check if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 })
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ success: false, message: "Failed to register user" }, { status: 500 })
  }
}
