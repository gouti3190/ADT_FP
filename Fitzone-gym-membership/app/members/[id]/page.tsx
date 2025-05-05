"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Trash2, User } from "lucide-react"

interface Member {
  member_id: number
  plan_id: number
  first_name: string
  last_name: string
  email: string
  phone: number
  dob?: string
  gender?: string
  address?: string
  join_date: string
  emergency_contact_no: number
  emergency_contact: string
}

interface Plan {
  plan_id: number
  plan_name: string
  description?: string
  cost: number
  duration_days: number
}

export default function MemberDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [member, setMember] = useState<Member | null>(null)
  const [plan, setPlan] = useState<Plan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchMember = async () => {
      try {
        console.log("Fetching member with ID:", params.id)

        // Fetch the member data from the API
        const response = await fetch(`/api/members/${params.id}`)
        const data = await response.json()

        console.log("API response:", data)

        if (data.success) {
          setMember(data.data)

          // Fetch the plan data for this member
          if (data.data.plan_id) {
            const planResponse = await fetch(`/api/plans/${data.data.plan_id}`)
            const planData = await planResponse.json()

            console.log("Plan API response:", planData)

            if (planData.success) {
              setPlan(planData.data)
            }
          }
        } else {
          setError("Failed to load member details")
        }
      } catch (error) {
        setError("Failed to load member details")
        console.error("Error fetching member:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchMember()
    }
  }, [params.id])

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this member?")) {
      try {
        const response = await fetch(`/api/members/${params.id}`, {
          method: "DELETE",
        })
        const data = await response.json()

        if (data.success) {
          router.push("/members")
        } else {
          setError("Failed to delete member")
        }
      } catch (error) {
        setError("Failed to delete member")
        console.error("Error deleting member:", error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Loading member details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <Link href="/members" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Members
        </Link>
      </div>
    )
  }

  if (!member) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Member not found</p>
        <Link href="/members" className="text-blue-500 hover:underline mt-4 inline-block">
          Back to Members
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/members" className="text-blue-500 hover:text-blue-700">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Member Details</h1>
        </div>

        <div className="flex gap-2">
          <Link href={`/members/${member.member_id}/edit`} className="btn-secondary flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Link>
          <button onClick={handleDelete} className="btn-danger flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 rounded-full p-8 mb-4">
              <User className="h-16 w-16 text-gray-500" />
            </div>
            <span
              className={`px-3 py-1 text-sm font-semibold rounded-full 
              ${
                member.gender === "M"
                  ? "bg-blue-100 text-blue-800"
                  : member.gender === "F"
                    ? "bg-pink-100 text-pink-800"
                    : "bg-purple-100 text-purple-800"
              }`}
            >
              {member.gender === "M" ? "Male" : member.gender === "F" ? "Female" : "Other"}
            </span>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">
                    {member.first_name} {member.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{member.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{member.phone}</p>
                </div>
                {member.dob && (
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{new Date(member.dob).toLocaleDateString()}</p>
                  </div>
                )}
                {member.address && (
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{member.address}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Membership Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Membership Plan</p>
                  <p className="font-medium">{plan ? plan.plan_name : `Plan ID: ${member.plan_id}`}</p>
                </div>
                {plan && (
                  <div>
                    <p className="text-sm text-gray-500">Plan Cost</p>
                    <p className="font-medium">${plan.cost.toFixed(2)}</p>
                  </div>
                )}
                {plan && (
                  <div>
                    <p className="text-sm text-gray-500">Plan Duration</p>
                    <p className="font-medium">{plan.duration_days} days</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Join Date</p>
                  <p className="font-medium">{new Date(member.join_date).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Emergency Contact</h2>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{member.emergency_contact}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{member.emergency_contact_no}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
