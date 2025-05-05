"use client"

import { useState, useEffect } from "react"
import { Database, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function DataLoaderPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [counts, setCounts] = useState<any>(null)
  const [error, setError] = useState("")

  const loadData = async () => {
    try {
      setIsLoading(true)
      setError("")
      setResult(null)

      const response = await fetch("/api/load-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
        fetchCounts()
      } else {
        setError(data.message || "Failed to load data")
      }
    } catch (error) {
      setError("An error occurred while loading data")
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCounts = async () => {
    try {
      const response = await fetch("/api/load-data")
      const data = await response.json()

      if (data.success) {
        setCounts(data.counts)
      } else {
        console.error("Failed to fetch counts:", data.message)
      }
    } catch (error) {
      console.error("Error fetching counts:", error)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Database Data Loader</h1>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Load Sample Data</h2>
        <p className="mb-4 text-gray-600">
          
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Warning:</strong> This will delete all existing data in these collections before loading the new
                data.
              </p>
            </div>
          </div>
        </div>

        <button onClick={loadData} disabled={isLoading} className="btn-primary flex items-center gap-2">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading Data...
            </>
          ) : (
            <>
              <Database className="h-4 w-4" />
              Load Sample Data
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        )}

        {result && result.success && (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-start gap-2">
            <CheckCircle className="h-5 w-5 mt-0.5" />
            <p>{result.message}</p>
          </div>
        )}
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Current Database Status</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collection
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Record Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Plans</td>
                <td className="px-6 py-4 whitespace-nowrap">{counts ? counts.plans : "Loading..."}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Members</td>
                <td className="px-6 py-4 whitespace-nowrap">{counts ? counts.members : "Loading..."}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Workouts</td>
                <td className="px-6 py-4 whitespace-nowrap">{counts ? counts.workouts : "Loading..."}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Attendance</td>
                <td className="px-6 py-4 whitespace-nowrap">{counts ? counts.attendance : "Loading..."}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Sessions</td>
                <td className="px-6 py-4 whitespace-nowrap">{counts ? counts.sessions : "Loading..."}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Payments</td>
                <td className="px-6 py-4 whitespace-nowrap">{counts ? counts.payments : "Loading..."}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
