import { Dumbbell, Target, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-3xl font-bold mb-4">About FitZone</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-600">
          FitZone is a comprehensive gym management system designed to help gym owners and managers streamline their
          operations and provide better service to their members.
        </p>
      </section>

      <section className="card">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <Target className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-gray-600">
            Our mission is to empower fitness businesses with technology that simplifies management tasks, enhances
            member experience, and drives business growth. We believe that gym owners should focus on what they do best
            - helping people achieve their fitness goals - while we take care of the administrative burden.
          </p>
        </div>
      </section>

      <section className="card">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4">
          FitZone was founded in 2025 by a team of fitness enthusiasts and technology experts who recognized the
          challenges faced by gym owners in managing their facilities efficiently. After working closely with several
          gym owners, we developed a solution that addresses the unique needs of fitness businesses.
        </p>
        <p className="text-gray-600">
          Today, FitZone serves hundreds of gyms worldwide, helping them streamline operations, improve member
          retention, and grow their business. Our team continues to innovate and enhance our platform based on customer
          feedback and industry trends.
        </p>
      </section>

      <section className="card">
        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="font-bold mb-2">Customer First</h3>
            <p className="text-gray-600">
              We prioritize our customers' needs and continuously improve our platform based on their feedback.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Award className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="font-bold mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for excellence in everything we do, from product development to customer support.
            </p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-2">
              <Dumbbell className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="font-bold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We continuously innovate to provide cutting-edge solutions that address evolving industry needs.
            </p>
          </div>
        </div>
      </section>

      <section className="card bg-blue-50 text-center py-8">
        <h2 className="text-2xl font-bold mb-4">Join the FitZone Community</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Experience the difference with FitZone and join our growing community of successful gym owners.
        </p>
        <a href="/register" className="btn-primary">
          Get Started Today
        </a>
      </section>
    </div>
  )
}
