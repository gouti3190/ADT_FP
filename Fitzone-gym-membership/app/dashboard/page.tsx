"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { BarChartIcon as ChartBarIcon, PieChartIcon as ChartPieIcon, UserIcon as UserGroupIcon } from "lucide-react"

// Define chart colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658"]

export default function DashboardPage() {
  const router = useRouter()
  const [analyticsData, setAnalyticsData] = useState<any>({
    ageDistribution: [],
    paymentsByPlan: [],
    attendanceByMember: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Fetch analytics data
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics")
        const data = await response.json()

        if (data.success) {
          setAnalyticsData(data.data)
        } else {
          setError("Failed to load analytics data")
        }
      } catch (error) {
        setError("An error occurred while fetching analytics data")
        console.error("Error fetching analytics:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [router])

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading analytics data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">FitZone Analytics Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Age Distribution Chart */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <UserGroupIcon className="h-5 w-5 text-blue-500" />
            <h2 className="text-xl font-semibold">Age Distribution of Members</h2>
          </div>
          <p className="text-gray-600 mb-4">Histogram showing the age distribution of gym members</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.ageDistribution || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Number of Members" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payments & Plans Analysis */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <ChartPieIcon className="h-5 w-5 text-green-500" />
            <h2 className="text-xl font-semibold">Payments & Plans Analysis</h2>
          </div>
          <p className="text-gray-600 mb-4">Pie chart showing total payment amount by plan</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.paymentsByPlan || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="totalAmount"
                  nameKey="plan"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {(analyticsData.paymentsByPlan || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Attendance Frequency */}
        <div className="card lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <ChartBarIcon className="h-5 w-5 text-yellow-500" />
            <h2 className="text-xl font-semibold">Member Attendance Frequency</h2>
          </div>
          <p className="text-gray-600 mb-4">Bar chart showing attendance frequency by member (top 10)</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData.attendanceByMember || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Number of Visits" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
