"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Filter, UserPlus } from "lucide-react"

interface Member {
  member_id: number
  first_name: string
  last_name: string
  email: string
  phone: number
  plan_id: number
  gender: string
  join_date: string
}

export default function MembersPage() {
  const router = useRouter()
  const [members, setMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [genderFilter, setGenderFilter] = useState("All")

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Fetch members
    const fetchMembers = async () => {
      try {
        const response = await fetch("/api/members")
        const data = await response.json()

        if (data.success) {
          setMembers(data.data)
        } else {
          console.error("Failed to fetch members:", data.message)
        }
      } catch (error) {
        console.error("Failed to fetch members:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMembers()
  }, [router])

  // Filter members based on search term and gender
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesGender = genderFilter === "All" || member.gender === genderFilter

    return matchesSearch && matchesGender
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Members</h1>
        <Link href="/members/create" className="btn-primary flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Member
        </Link>
      </div>

      <div className="card">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select className="form-input" value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
              <option value="All">All Genders</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-600">Loading members...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No members found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMembers.map((member) => (
                  <tr key={member.member_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{member.member_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {member.first_name} {member.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.email}</div>
                      <div className="text-sm text-gray-500">{member.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
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
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(member.join_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/members/${member.member_id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </Link>
                      <Link
                        href={`/members/${member.member_id}/edit`}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={async () => {
                          if (confirm("Are you sure you want to delete this member?")) {
                            try {
                              const response = await fetch(`/api/members/${member.member_id}`, {
                                method: "DELETE",
                              })
                              const data = await response.json()

                              if (data.success) {
                                setMembers(members.filter((m) => m.member_id !== member.member_id))
                              } else {
                                alert(`Failed to delete member: ${data.message}`)
                              }
                            } catch (error) {
                              console.error("Error deleting member:", error)
                              alert("Failed to delete member")
                            }
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
