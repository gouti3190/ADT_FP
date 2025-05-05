import Link from "next/link"
import { Users, Award, Clock } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg">
        <h1 className="text-4xl font-bold mb-4">FitZone: Comprehensive Gym Management System</h1>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Streamline your gym operations with our all-in-one management solution
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/register" className="btn-primary">
            Get Started
          </Link>
          <Link
            href="/about"
            className="bg-white text-blue-500 hover:bg-gray-100 font-semibold py-2 px-4 rounded transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Our Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <Users className="h-12 w-12 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Member Management</h3>
            <p className="text-gray-600">
              Easily add, update, and manage your gym members with our intuitive interface.
            </p>
          </div>
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <Award className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Membership Plans</h3>
            <p className="text-gray-600">Create and manage different membership plans to suit your business needs.</p>
          </div>
          <div className="card text-center">
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Attendance Tracking</h3>
            <p className="text-gray-600">Track member attendance and analyze usage patterns to optimize your gym.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="card bg-blue-50 text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Ready to transform your gym management?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join hundreds of gym owners who have streamlined their operations with FitZone.
        </p>
        <Link href="/register" className="btn-primary">
          Sign Up Now
        </Link>
      </section>
    </div>
  )
}
