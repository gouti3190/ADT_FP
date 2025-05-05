"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"

interface Plan {
  plan_id: number
  plan_name: string
  description?: string
  cost: number
  duration_days: number
}

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

export default function EditMemberPage() {
  const params = useParams()
  const router = useRouter()
  const [plans, setPlans] = useState<Plan[]>([])
  const [formData, setFormData] = useState<any>({
    member_id: "",
    plan_id: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    join_date: "",
    emergency_contact_no: "",
    emergency_contact: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch plans
        const plansResponse = await fetch("/api/plans")
        const plansData = await plansResponse.json()

        if (plansData.success) {
          setPlans(plansData.data)
        }

        // Fetch member
        const memberResponse = await fetch(`/api/members/${params.id}`)
        const memberData = await memberResponse.json()

        if (memberData.success) {
          const member = memberData.data

          // Format date fields for the form
          const formattedMember = {
            ...member,
            dob: member.dob ? new Date(member.dob).toISOString().split("T")[0] : "",
            join_date: new Date(member.join_date).toISOString().split("T")[0],
          }

          setFormData(formattedMember)
        } else {
          setError("Failed to load member details")
        }
      } catch (error) {
        setError("Failed to load data")
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Prepare the data for submission
      const submitData = {
        ...formData,
        plan_id: Number(formData.plan_id),
        phone: Number(formData.phone),
        emergency_contact_no: Number(formData.emergency_contact_no),
      }

      const response = await fetch(`/api/members/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/members/${params.id}`)
      } else {
        setError(data.message || "Failed to update member")
      }
    } catch (error) {
      setError("Failed to update member. Please try again.")
      console.error("Error updating member:", error)
    } finally {
      setIsSubmitting(false)
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

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/members/${params.id}`} className="text-blue-500 hover:text-blue-700">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold">Edit Member</h1>
      </div>

      <div className="card">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="member_id" className="form-label">
                Member ID
              </label>
              <input
                type="number"
                id="member_id"
                name="member_id"
                value={formData.member_id}
                onChange={handleChange}
                className="form-input"
                disabled
                required
              />
              <p className="text-xs text-gray-500 mt-1">Member ID cannot be changed</p>
            </div>

            <div>
              <label htmlFor="plan_id" className="form-label">
                Membership Plan
              </label>
              <select
                id="plan_id"
                name="plan_id"
                value={formData.plan_id}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select a plan</option>
                {plans.map((plan) => (
                  <option key={plan.plan_id} value={plan.plan_id}>
                    {plan.plan_name} - ${plan.cost} ({plan.duration_days} days)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="form-input">
                <option value="">Select gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-input"
                rows={2}
              ></textarea>
            </div>

            <div>
              <label htmlFor="join_date" className="form-label">
                Join Date
              </label>
              <input
                type="date"
                id="join_date"
                name="join_date"
                value={formData.join_date}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="emergency_contact" className="form-label">
                Emergency Contact Name
              </label>
              <input
                type="text"
                id="emergency_contact"
                name="emergency_contact"
                value={formData.emergency_contact}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="emergency_contact_no" className="form-label">
                Emergency Contact Number
              </label>
              <input
                type="tel"
                id="emergency_contact_no"
                name="emergency_contact_no"
                value={formData.emergency_contact_no}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href={`/members/${params.id}`} className="btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-primary flex items-center gap-2" disabled={isSubmitting}>
              {isSubmitting ? (
                "Updating..."
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Update Member
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
