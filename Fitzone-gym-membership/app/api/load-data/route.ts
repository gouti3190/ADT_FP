import { NextResponse } from "next/server"
import { loadAllData, getDataCounts } from "@/lib/data-loader"

export async function GET() {
  try {
    const counts = await getDataCounts()
    return NextResponse.json(counts)
  } catch (error) {
    console.error("Error getting data counts:", error)
    return NextResponse.json({ success: false, message: "Failed to get data counts" }, { status: 500 })
  }
}

export async function POST() {
  try {
    const result = await loadAllData()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error loading data:", error)
    return NextResponse.json({ success: false, message: "Failed to load data" }, { status: 500 })
  }
}
