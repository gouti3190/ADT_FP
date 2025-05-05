import connectToDatabase from "./mongodb"
import Plan from "@/models/Plan"
import Member from "@/models/Member"
import Attendance from "@/models/Attendance"
import Workout from "@/models/Workout"
import Session from "@/models/Session"
import Payment from "@/models/Payment"

// Sample data from the document
const plansData = [
  {
    plan_id: 1,
    plan_name: "Plan_1",
    description: "Monthly access with basic amenities",
    cost: 143.22,
    duration_days: 167,
  },
  {
    plan_id: 2,
    plan_name: "Plan_2",
    description: "Quarterly plan with group classes included",
    cost: 181.66,
    duration_days: 208,
  },
  {
    plan_id: 3,
    plan_name: "Plan_3",
    description: "Half-year plan with trainer support",
    cost: 159.85,
    duration_days: 107,
  },
  {
    plan_id: 4,
    plan_name: "Plan_4",
    description: "Yearly plan with nutrition counseling",
    cost: 85.84,
    duration_days: 271,
  },
  {
    plan_id: 5,
    plan_name: "Plan_5",
    description: "Premium plan with full access and perks",
    cost: 107.14,
    duration_days: 88,
  },
]

// Complete 30 members data with consecutive IDs
const membersData = [
  // Original 5 members
  {
    member_id: 1,
    plan_id: 3,
    first_name: "William",
    last_name: "Padilla",
    email: "smithmichelle@hotmail.com",
    phone: 7969199966,
    dob: new Date("2000-03-11"),
    gender: "M",
    address: "777 Bailey Junction, New Jenniferbury, NC 73649",
    join_date: new Date("2025-02-21"),
    emergency_contact_no: 9866544847,
    emergency_contact: "Ronald Johnson",
  },
  {
    member_id: 2,
    plan_id: 2,
    first_name: "Allen",
    last_name: "Wheeler",
    email: "williamreyes@mcpherson.info",
    phone: 6645665702,
    dob: new Date("1974-05-20"),
    gender: "M",
    address: "85442 Espinoza Fields, Port Michael, MD 19797",
    join_date: new Date("2024-07-19"),
    emergency_contact_no: 9129416206,
    emergency_contact: "Carla Diaz",
  },
  {
    member_id: 3,
    plan_id: 1,
    first_name: "Donna",
    last_name: "Sanchez",
    email: "phillipsrandy@hotmail.com",
    phone: 9199311758,
    dob: new Date("1978-05-23"),
    gender: "M",
    address: "2969 Casey Extensions, Archerborough, KY 79890",
    join_date: new Date("2023-10-07"),
    emergency_contact_no: 8451969686,
    emergency_contact: "Becky Robinson",
  },
  {
    member_id: 4,
    plan_id: 2,
    first_name: "Carrie",
    last_name: "Olson",
    email: "mooremichael@shah-mann.com",
    phone: 9438059335,
    dob: new Date("1980-05-12"),
    gender: "O",
    address: "4784 Lewis Spurs, West Jamesstad, LA 55604",
    join_date: new Date("2025-01-11"),
    emergency_contact_no: 6852345543,
    emergency_contact: "Daniel Baker",
  },
  {
    member_id: 5,
    plan_id: 1,
    first_name: "Elizabeth",
    last_name: "James",
    email: "hannahsmith@gmail.com",
    phone: 8291506374,
    dob: new Date("1993-01-08"),
    gender: "O",
    address: "9597 Osborne Roads Suite 573, Matthewbury, NC 58985",
    join_date: new Date("2024-12-25"),
    emergency_contact_no: 8538583900,
    emergency_contact: "David Glover",
  },
  // Additional 25 members with consecutive IDs (6-30)
  {
    member_id: 6,
    plan_id: 4,
    first_name: "Michael",
    last_name: "Johnson",
    email: "michaeljohnson@example.com",
    phone: 5551234567,
    dob: new Date("1985-07-15"),
    gender: "M",
    address: "123 Main Street, Anytown, CA 90210",
    join_date: new Date("2024-01-05"),
    emergency_contact_no: 5559876543,
    emergency_contact: "Sarah Johnson",
  },
  {
    member_id: 7,
    plan_id: 2,
    first_name: "Jennifer",
    last_name: "Smith",
    email: "jennifersmith@example.com",
    phone: 5552345678,
    dob: new Date("1990-03-22"),
    gender: "F",
    address: "456 Oak Avenue, Springfield, IL 62701",
    join_date: new Date("2024-02-10"),
    emergency_contact_no: 5558765432,
    emergency_contact: "Robert Smith",
  },
  {
    member_id: 8,
    plan_id: 3,
    first_name: "David",
    last_name: "Brown",
    email: "davidbrown@example.com",
    phone: 5553456789,
    dob: new Date("1978-11-30"),
    gender: "M",
    address: "789 Pine Road, Lakeside, MI 49116",
    join_date: new Date("2024-03-15"),
    emergency_contact_no: 5557654321,
    emergency_contact: "Lisa Brown",
  },
  {
    member_id: 9,
    plan_id: 1,
    first_name: "Jessica",
    last_name: "Davis",
    email: "jessicadavis@example.com",
    phone: 5554567890,
    dob: new Date("1995-05-18"),
    gender: "F",
    address: "101 Maple Drive, Rivertown, NY 10001",
    join_date: new Date("2024-04-20"),
    emergency_contact_no: 5556543210,
    emergency_contact: "Mark Davis",
  },
  {
    member_id: 10,
    plan_id: 5,
    first_name: "Christopher",
    last_name: "Wilson",
    email: "chriswilson@example.com",
    phone: 5555678901,
    dob: new Date("1982-09-07"),
    gender: "M",
    address: "202 Cedar Lane, Mountain View, CO 80401",
    join_date: new Date("2024-05-25"),
    emergency_contact_no: 5555432109,
    emergency_contact: "Emily Wilson",
  },
  {
    member_id: 11,
    plan_id: 2,
    first_name: "Amanda",
    last_name: "Martinez",
    email: "amandamartinez@example.com",
    phone: 5556789012,
    dob: new Date("1988-12-14"),
    gender: "F",
    address: "303 Birch Street, Seaside, FL 32459",
    join_date: new Date("2024-06-30"),
    emergency_contact_no: 5554321098,
    emergency_contact: "Carlos Martinez",
  },
  {
    member_id: 12,
    plan_id: 4,
    first_name: "Matthew",
    last_name: "Taylor",
    email: "matthewtaylor@example.com",
    phone: 5557890123,
    dob: new Date("1975-02-28"),
    gender: "M",
    address: "404 Elm Court, Desert Springs, AZ 85001",
    join_date: new Date("2024-07-05"),
    emergency_contact_no: 5553210987,
    emergency_contact: "Nicole Taylor",
  },
  {
    member_id: 13,
    plan_id: 3,
    first_name: "Stephanie",
    last_name: "Anderson",
    email: "stephanieanderson@example.com",
    phone: 5558901234,
    dob: new Date("1992-08-09"),
    gender: "F",
    address: "505 Walnut Avenue, Forestville, OR 97301",
    join_date: new Date("2024-08-10"),
    emergency_contact_no: 5552109876,
    emergency_contact: "Brian Anderson",
  },
  {
    member_id: 14,
    plan_id: 1,
    first_name: "Daniel",
    last_name: "Thomas",
    email: "danielthomas@example.com",
    phone: 5559012345,
    dob: new Date("1980-04-17"),
    gender: "M",
    address: "606 Spruce Boulevard, Hillside, WA 98101",
    join_date: new Date("2024-09-15"),
    emergency_contact_no: 5551098765,
    emergency_contact: "Rachel Thomas",
  },
  {
    member_id: 15,
    plan_id: 5,
    first_name: "Lauren",
    last_name: "Garcia",
    email: "laurengarcia@example.com",
    phone: 5550123456,
    dob: new Date("1993-10-25"),
    gender: "F",
    address: "707 Aspen Way, Valleytown, TX 75001",
    join_date: new Date("2024-10-20"),
    emergency_contact_no: 5550987654,
    emergency_contact: "Miguel Garcia",
  },
  {
    member_id: 16,
    plan_id: 2,
    first_name: "Ryan",
    last_name: "Rodriguez",
    email: "ryanrodriguez@example.com",
    phone: 5551234568,
    dob: new Date("1987-06-03"),
    gender: "M",
    address: "808 Redwood Street, Lakeshore, MN 55401",
    join_date: new Date("2024-11-25"),
    emergency_contact_no: 5559876544,
    emergency_contact: "Isabella Rodriguez",
  },
  {
    member_id: 17,
    plan_id: 3,
    first_name: "Megan",
    last_name: "Lee",
    email: "meganlee@example.com",
    phone: 5552345679,
    dob: new Date("1991-01-19"),
    gender: "F",
    address: "909 Sequoia Drive, Mountainview, UT 84101",
    join_date: new Date("2024-12-30"),
    emergency_contact_no: 5558765433,
    emergency_contact: "James Lee",
  },
  {
    member_id: 18,
    plan_id: 4,
    first_name: "Kevin",
    last_name: "Nguyen",
    email: "kevinnguyen@example.com",
    phone: 5553456790,
    dob: new Date("1979-03-27"),
    gender: "M",
    address: "1010 Cypress Lane, Riverside, GA 30301",
    join_date: new Date("2025-01-05"),
    emergency_contact_no: 5557654322,
    emergency_contact: "Tina Nguyen",
  },
  {
    member_id: 19,
    plan_id: 1,
    first_name: "Samantha",
    last_name: "Kim",
    email: "samanthakim@example.com",
    phone: 5554567891,
    dob: new Date("1994-07-12"),
    gender: "F",
    address: "1111 Willow Street, Oceanside, SC 29401",
    join_date: new Date("2025-02-10"),
    emergency_contact_no: 5556543211,
    emergency_contact: "David Kim",
  },
  {
    member_id: 20,
    plan_id: 5,
    first_name: "Brandon",
    last_name: "Patel",
    email: "brandonpatel@example.com",
    phone: 5555678902,
    dob: new Date("1983-09-05"),
    gender: "M",
    address: "1212 Magnolia Avenue, Plainfield, NJ 07060",
    join_date: new Date("2025-03-15"),
    emergency_contact_no: 5555432110,
    emergency_contact: "Priya Patel",
  },
  {
    member_id: 21,
    plan_id: 2,
    first_name: "Nicole",
    last_name: "Wong",
    email: "nicolewong@example.com",
    phone: 5556789013,
    dob: new Date("1989-11-23"),
    gender: "F",
    address: "1313 Juniper Road, Meadowland, PA 19101",
    join_date: new Date("2023-04-20"),
    emergency_contact_no: 5554321099,
    emergency_contact: "Michael Wong",
  },
  {
    member_id: 22,
    plan_id: 3,
    first_name: "Eric",
    last_name: "Chen",
    email: "ericchen@example.com",
    phone: 5557890124,
    dob: new Date("1976-05-31"),
    gender: "M",
    address: "1414 Sycamore Court, Highland, OH 44101",
    join_date: new Date("2023-05-25"),
    emergency_contact_no: 5553210988,
    emergency_contact: "Grace Chen",
  },
  {
    member_id: 23,
    plan_id: 4,
    first_name: "Olivia",
    last_name: "Singh",
    email: "oliviasingh@example.com",
    phone: 5558901235,
    dob: new Date("1997-02-14"),
    gender: "F",
    address: "1515 Poplar Lane, Westfield, MA 01001",
    join_date: new Date("2023-06-30"),
    emergency_contact_no: 5552109877,
    emergency_contact: "Raj Singh",
  },
  {
    member_id: 24,
    plan_id: 1,
    first_name: "Jason",
    last_name: "Gonzalez",
    email: "jasongonzalez@example.com",
    phone: 5559012346,
    dob: new Date("1981-08-08"),
    gender: "M",
    address: "1616 Dogwood Street, Sunnydale, NV 89101",
    join_date: new Date("2023-07-05"),
    emergency_contact_no: 5551098766,
    emergency_contact: "Maria Gonzalez",
  },
  {
    member_id: 25,
    plan_id: 5,
    first_name: "Rebecca",
    last_name: "Park",
    email: "rebeccapark@example.com",
    phone: 5550123457,
    dob: new Date("1994-12-01"),
    gender: "F",
    address: "1717 Chestnut Avenue, Brookside, WI 53201",
    join_date: new Date("2023-08-10"),
    emergency_contact_no: 5550987655,
    emergency_contact: "Andrew Park",
  },
  {
    member_id: 26,
    plan_id: 2,
    first_name: "Justin",
    last_name: "Thompson",
    email: "justinthompson@example.com",
    phone: 5551234569,
    dob: new Date("1986-04-19"),
    gender: "M",
    address: "1818 Hickory Drive, Greenfield, KS 66101",
    join_date: new Date("2023-09-15"),
    emergency_contact_no: 5559876545,
    emergency_contact: "Ashley Thompson",
  },
  {
    member_id: 27,
    plan_id: 3,
    first_name: "Michelle",
    last_name: "Lopez",
    email: "michellelopez@example.com",
    phone: 5552345680,
    dob: new Date("1992-06-27"),
    gender: "F",
    address: "1919 Beech Road, Clearwater, MO 63101",
    join_date: new Date("2023-10-20"),
    emergency_contact_no: 5558765434,
    emergency_contact: "Antonio Lopez",
  },
  {
    member_id: 28,
    plan_id: 4,
    first_name: "Andrew",
    last_name: "Jackson",
    email: "andrewjackson@example.com",
    phone: 5553456791,
    dob: new Date("1977-10-15"),
    gender: "M",
    address: "2020 Cedar Court, Pineville, AR 72701",
    join_date: new Date("2023-11-25"),
    emergency_contact_no: 5557654323,
    emergency_contact: "Jennifer Jackson",
  },
  {
    member_id: 29,
    plan_id: 1,
    first_name: "Sophia",
    last_name: "Miller",
    email: "sophiamiller@example.com",
    phone: 5554567892,
    dob: new Date("1996-12-23"),
    gender: "F",
    address: "2121 Birch Lane, Oakdale, CT 06101",
    join_date: new Date("2023-12-30"),
    emergency_contact_no: 5556543212,
    emergency_contact: "William Miller",
  },
  {
    member_id: 30,
    plan_id: 5,
    first_name: "Tyler",
    last_name: "White",
    email: "tylerwhite@example.com",
    phone: 5555678903,
    dob: new Date("1984-02-09"),
    gender: "M",
    address: "2222 Maple Street, Riverdale, DE 19701",
    join_date: new Date("2024-01-05"),
    emergency_contact_no: 5555432111,
    emergency_contact: "Emma White",
  },
]

// Complete workout data (not truncated)
const workoutsData = [
  {
    workout_id: 1,
    workout_name: "Push Ups",
    muscle_concentrated: "Chest",
    description: "Proper form and guidance for push ups",
    calories_burned_avg: 478.04,
    difficulty: "H",
  },
  {
    workout_id: 2,
    workout_name: "Squats",
    muscle_concentrated: "Legs",
    description: "Proper form and guidance for squats",
    calories_burned_avg: 139.35,
    difficulty: "M",
  },
  {
    workout_id: 3,
    workout_name: "Deadlift",
    muscle_concentrated: "Back",
    description: "Proper form and guidance for deadlift",
    calories_burned_avg: 190.58,
    difficulty: "H",
  },
  {
    workout_id: 4,
    workout_name: "Bench Press",
    muscle_concentrated: "Chest",
    description: "Proper form and guidance for bench press",
    calories_burned_avg: 411.29,
    difficulty: "M",
  },
  {
    workout_id: 5,
    workout_name: "Lunges",
    muscle_concentrated: "Legs",
    description: "Proper form and guidance for lunges",
    calories_burned_avg: 156.98,
    difficulty: "E",
  },
]

// Updated attendance data with varying visit frequencies for different members
const attendanceData = [
  // Member 3 (Donna Sanchez) - 15 visits
  {
    attendance_id: 1,
    member_id: 3,
    date: new Date("2024-12-01"),
    check_in: new Date("2024-12-01T06:00:00"),
    check_out: new Date("2024-12-01T08:00:00"),
  },
  {
    attendance_id: 2,
    member_id: 3,
    date: new Date("2024-12-03"),
    check_in: new Date("2024-12-03T07:00:00"),
    check_out: new Date("2024-12-03T09:00:00"),
  },
  {
    attendance_id: 3,
    member_id: 3,
    date: new Date("2024-12-05"),
    check_in: new Date("2024-12-05T06:30:00"),
    check_out: new Date("2024-12-05T08:30:00"),
  },
  {
    attendance_id: 4,
    member_id: 3,
    date: new Date("2024-12-08"),
    check_in: new Date("2024-12-08T07:30:00"),
    check_out: new Date("2024-12-08T09:30:00"),
  },
  {
    attendance_id: 5,
    member_id: 3,
    date: new Date("2024-12-10"),
    check_in: new Date("2024-12-10T06:00:00"),
    check_out: new Date("2024-12-10T08:00:00"),
  },
  {
    attendance_id: 6,
    member_id: 3,
    date: new Date("2024-12-12"),
    check_in: new Date("2024-12-12T07:00:00"),
    check_out: new Date("2024-12-12T09:00:00"),
  },
  {
    attendance_id: 7,
    member_id: 3,
    date: new Date("2024-12-15"),
    check_in: new Date("2024-12-15T06:30:00"),
    check_out: new Date("2024-12-15T08:30:00"),
  },
  {
    attendance_id: 8,
    member_id: 3,
    date: new Date("2024-12-17"),
    check_in: new Date("2024-12-17T07:30:00"),
    check_out: new Date("2024-12-17T09:30:00"),
  },
  {
    attendance_id: 9,
    member_id: 3,
    date: new Date("2024-12-19"),
    check_in: new Date("2024-12-19T06:00:00"),
    check_out: new Date("2024-12-19T08:00:00"),
  },
  {
    attendance_id: 10,
    member_id: 3,
    date: new Date("2024-12-22"),
    check_in: new Date("2024-12-22T07:00:00"),
    check_out: new Date("2024-12-22T09:00:00"),
  },
  {
    attendance_id: 11,
    member_id: 3,
    date: new Date("2024-12-24"),
    check_in: new Date("2024-12-24T06:30:00"),
    check_out: new Date("2024-12-24T08:30:00"),
  },
  {
    attendance_id: 12,
    member_id: 3,
    date: new Date("2024-12-26"),
    check_in: new Date("2024-12-26T07:30:00"),
    check_out: new Date("2024-12-26T09:30:00"),
  },
  {
    attendance_id: 13,
    member_id: 3,
    date: new Date("2024-12-29"),
    check_in: new Date("2024-12-29T06:00:00"),
    check_out: new Date("2024-12-29T08:00:00"),
  },
  {
    attendance_id: 14,
    member_id: 3,
    date: new Date("2024-12-30"),
    check_in: new Date("2024-12-30T07:00:00"),
    check_out: new Date("2024-12-30T09:00:00"),
  },
  {
    attendance_id: 15,
    member_id: 3,
    date: new Date("2024-12-31"),
    check_in: new Date("2024-12-31T06:30:00"),
    check_out: new Date("2024-12-31T08:30:00"),
  },

  // Member 8 (David Brown) - 12 visits
  {
    attendance_id: 16,
    member_id: 8,
    date: new Date("2024-12-01"),
    check_in: new Date("2024-12-01T17:00:00"),
    check_out: new Date("2024-12-01T19:00:00"),
  },
  {
    attendance_id: 17,
    member_id: 8,
    date: new Date("2024-12-03"),
    check_in: new Date("2024-12-03T18:00:00"),
    check_out: new Date("2024-12-03T20:00:00"),
  },
  {
    attendance_id: 18,
    member_id: 8,
    date: new Date("2024-12-05"),
    check_in: new Date("2024-12-05T17:30:00"),
    check_out: new Date("2024-12-05T19:30:00"),
  },
  {
    attendance_id: 19,
    member_id: 8,
    date: new Date("2024-12-08"),
    check_in: new Date("2024-12-08T18:30:00"),
    check_out: new Date("2024-12-08T20:30:00"),
  },
  {
    attendance_id: 20,
    member_id: 8,
    date: new Date("2024-12-10"),
    check_in: new Date("2024-12-10T17:00:00"),
    check_out: new Date("2024-12-10T19:00:00"),
  },
  {
    attendance_id: 21,
    member_id: 8,
    date: new Date("2024-12-12"),
    check_in: new Date("2024-12-12T18:00:00"),
    check_out: new Date("2024-12-12T20:00:00"),
  },
  {
    attendance_id: 22,
    member_id: 8,
    date: new Date("2024-12-15"),
    check_in: new Date("2024-12-15T17:30:00"),
    check_out: new Date("2024-12-15T19:30:00"),
  },
  {
    attendance_id: 23,
    member_id: 8,
    date: new Date("2024-12-17"),
    check_in: new Date("2024-12-17T18:30:00"),
    check_out: new Date("2024-12-17T20:30:00"),
  },
  {
    attendance_id: 24,
    member_id: 8,
    date: new Date("2024-12-19"),
    check_in: new Date("2024-12-19T17:00:00"),
    check_out: new Date("2024-12-19T19:00:00"),
  },
  {
    attendance_id: 25,
    member_id: 8,
    date: new Date("2024-12-22"),
    check_in: new Date("2024-12-22T18:00:00"),
    check_out: new Date("2024-12-22T20:00:00"),
  },
  {
    attendance_id: 26,
    member_id: 8,
    date: new Date("2024-12-26"),
    check_in: new Date("2024-12-26T17:30:00"),
    check_out: new Date("2024-12-26T19:30:00"),
  },
  {
    attendance_id: 27,
    member_id: 8,
    date: new Date("2024-12-29"),
    check_in: new Date("2024-12-29T18:30:00"),
    check_out: new Date("2024-12-29T20:30:00"),
  },

  // Member 13 (Stephanie Anderson) - 10 visits
  {
    attendance_id: 28,
    member_id: 13,
    date: new Date("2024-12-02"),
    check_in: new Date("2024-12-02T07:00:00"),
    check_out: new Date("2024-12-02T09:00:00"),
  },
  {
    attendance_id: 29,
    member_id: 13,
    date: new Date("2024-12-04"),
    check_in: new Date("2024-12-04T06:30:00"),
    check_out: new Date("2024-12-04T08:30:00"),
  },
  {
    attendance_id: 30,
    member_id: 13,
    date: new Date("2024-12-06"),
    check_in: new Date("2024-12-06T07:30:00"),
    check_out: new Date("2024-12-06T09:30:00"),
  },
  {
    attendance_id: 31,
    member_id: 13,
    date: new Date("2024-12-09"),
    check_in: new Date("2024-12-09T06:00:00"),
    check_out: new Date("2024-12-09T08:00:00"),
  },
  {
    attendance_id: 32,
    member_id: 13,
    date: new Date("2024-12-11"),
    check_in: new Date("2024-12-11T07:00:00"),
    check_out: new Date("2024-12-11T09:00:00"),
  },
  {
    attendance_id: 33,
    member_id: 13,
    date: new Date("2024-12-13"),
    check_in: new Date("2024-12-13T06:30:00"),
    check_out: new Date("2024-12-13T08:30:00"),
  },
  {
    attendance_id: 34,
    member_id: 13,
    date: new Date("2024-12-16"),
    check_in: new Date("2024-12-16T07:30:00"),
    check_out: new Date("2024-12-16T09:30:00"),
  },
  {
    attendance_id: 35,
    member_id: 13,
    date: new Date("2024-12-18"),
    check_in: new Date("2024-12-18T06:00:00"),
    check_out: new Date("2024-12-18T08:00:00"),
  },
  {
    attendance_id: 36,
    member_id: 13,
    date: new Date("2024-12-20"),
    check_in: new Date("2024-12-20T07:00:00"),
    check_out: new Date("2024-12-20T09:00:00"),
  },
  {
    attendance_id: 37,
    member_id: 13,
    date: new Date("2024-12-23"),
    check_in: new Date("2024-12-23T06:30:00"),
    check_out: new Date("2024-12-23T08:30:00"),
  },

  // Member 7 (Jennifer Smith) - 8 visits
  {
    attendance_id: 38,
    member_id: 7,
    date: new Date("2024-12-02"),
    check_in: new Date("2024-12-02T17:00:00"),
    check_out: new Date("2024-12-02T19:00:00"),
  },
  {
    attendance_id: 39,
    member_id: 7,
    date: new Date("2024-12-05"),
    check_in: new Date("2024-12-05T18:00:00"),
    check_out: new Date("2024-12-05T20:00:00"),
  },
  {
    attendance_id: 40,
    member_id: 7,
    date: new Date("2024-12-09"),
    check_in: new Date("2024-12-09T17:30:00"),
    check_out: new Date("2024-12-09T19:30:00"),
  },
  {
    attendance_id: 41,
    member_id: 7,
    date: new Date("2024-12-12"),
    check_in: new Date("2024-12-12T18:30:00"),
    check_out: new Date("2024-12-12T20:30:00"),
  },
  {
    attendance_id: 42,
    member_id: 7,
    date: new Date("2024-12-16"),
    check_in: new Date("2024-12-16T17:00:00"),
    check_out: new Date("2024-12-16T19:00:00"),
  },
  {
    attendance_id: 43,
    member_id: 7,
    date: new Date("2024-12-19"),
    check_in: new Date("2024-12-19T18:00:00"),
    check_out: new Date("2024-12-19T20:00:00"),
  },
  {
    attendance_id: 44,
    member_id: 7,
    date: new Date("2024-12-23"),
    check_in: new Date("2024-12-23T17:30:00"),
    check_out: new Date("2024-12-23T19:30:00"),
  },
  {
    attendance_id: 45,
    member_id: 7,
    date: new Date("2024-12-30"),
    check_in: new Date("2024-12-30T18:30:00"),
    check_out: new Date("2024-12-30T20:30:00"),
  },

  // Member 9 (Jessica Davis) - 6 visits
  {
    attendance_id: 46,
    member_id: 9,
    date: new Date("2024-12-03"),
    check_in: new Date("2024-12-03T16:00:00"),
    check_out: new Date("2024-12-03T18:00:00"),
  },
  {
    attendance_id: 47,
    member_id: 9,
    date: new Date("2024-12-10"),
    check_in: new Date("2024-12-10T16:30:00"),
    check_out: new Date("2024-12-10T18:30:00"),
  },
  {
    attendance_id: 48,
    member_id: 9,
    date: new Date("2024-12-17"),
    check_in: new Date("2024-12-17T16:00:00"),
    check_out: new Date("2024-12-17T18:00:00"),
  },
  {
    attendance_id: 49,
    member_id: 9,
    date: new Date("2024-12-20"),
    check_in: new Date("2024-12-20T16:30:00"),
    check_out: new Date("2024-12-20T18:30:00"),
  },
  {
    attendance_id: 50,
    member_id: 9,
    date: new Date("2024-12-24"),
    check_in: new Date("2024-12-24T16:00:00"),
    check_out: new Date("2024-12-24T18:00:00"),
  },
  {
    attendance_id: 51,
    member_id: 9,
    date: new Date("2024-12-31"),
    check_in: new Date("2024-12-31T16:30:00"),
    check_out: new Date("2024-12-31T18:30:00"),
  },

  // Member 6 (Michael Johnson) - 5 visits
  {
    attendance_id: 52,
    member_id: 6,
    date: new Date("2024-12-04"),
    check_in: new Date("2024-12-04T07:00:00"),
    check_out: new Date("2024-12-04T09:00:00"),
  },
  {
    attendance_id: 53,
    member_id: 6,
    date: new Date("2024-12-11"),
    check_in: new Date("2024-12-11T07:30:00"),
    check_out: new Date("2024-12-11T09:30:00"),
  },
  {
    attendance_id: 54,
    member_id: 6,
    date: new Date("2024-12-18"),
    check_in: new Date("2024-12-18T07:00:00"),
    check_out: new Date("2024-12-18T09:00:00"),
  },
  {
    attendance_id: 55,
    member_id: 6,
    date: new Date("2024-12-25"),
    check_in: new Date("2024-12-25T07:30:00"),
    check_out: new Date("2024-12-25T09:30:00"),
  },
  {
    attendance_id: 56,
    member_id: 6,
    date: new Date("2024-12-30"),
    check_in: new Date("2024-12-30T07:00:00"),
    check_out: new Date("2024-12-30T09:00:00"),
  },

  // Member 15 (Lauren Garcia) - 4 visits
  {
    attendance_id: 57,
    member_id: 15,
    date: new Date("2024-12-05"),
    check_in: new Date("2024-12-05T16:00:00"),
    check_out: new Date("2024-12-05T18:00:00"),
  },
  {
    attendance_id: 58,
    member_id: 15,
    date: new Date("2024-12-12"),
    check_in: new Date("2024-12-12T16:30:00"),
    check_out: new Date("2024-12-12T18:30:00"),
  },
  {
    attendance_id: 59,
    member_id: 15,
    date: new Date("2024-12-19"),
    check_in: new Date("2024-12-19T16:00:00"),
    check_out: new Date("2024-12-19T18:00:00"),
  },
  {
    attendance_id: 60,
    member_id: 15,
    date: new Date("2024-12-26"),
    check_in: new Date("2024-12-26T16:30:00"),
    check_out: new Date("2024-12-26T18:30:00"),
  },

  // Member 10 (Christopher Wilson) - 3 visits
  {
    attendance_id: 61,
    member_id: 10,
    date: new Date("2024-12-07"),
    check_in: new Date("2024-12-07T10:00:00"),
    check_out: new Date("2024-12-07T12:00:00"),
  },
  {
    attendance_id: 62,
    member_id: 10,
    date: new Date("2024-12-14"),
    check_in: new Date("2024-12-14T10:30:00"),
    check_out: new Date("2024-12-14T12:30:00"),
  },
  {
    attendance_id: 63,
    member_id: 10,
    date: new Date("2024-12-21"),
    check_in: new Date("2024-12-21T10:00:00"),
    check_out: new Date("2024-12-21T12:00:00"),
  },

  // Member 12 (Matthew Taylor) - 2 visits
  {
    attendance_id: 64,
    member_id: 12,
    date: new Date("2024-12-08"),
    check_in: new Date("2024-12-08T15:00:00"),
    check_out: new Date("2024-12-08T17:00:00"),
  },
  {
    attendance_id: 65,
    member_id: 12,
    date: new Date("2024-12-22"),
    check_in: new Date("2024-12-22T15:30:00"),
    check_out: new Date("2024-12-22T17:30:00"),
  },

  // Member 1 (William Padilla) - 1 visit
  {
    attendance_id: 66,
    member_id: 1,
    date: new Date("2024-12-15"),
    check_in: new Date("2024-12-15T09:00:00"),
    check_out: new Date("2024-12-15T11:00:00"),
  },
]

// Complete sessions data (not truncated)
const sessionsData = [
  { session_id: 1, attendance_id: 1, workout_id: 1, duration: 45 },
  { session_id: 2, attendance_id: 2, workout_id: 2, duration: 30 },
  { session_id: 3, attendance_id: 3, workout_id: 3, duration: 60 },
  { session_id: 4, attendance_id: 4, workout_id: 4, duration: 45 },
  { session_id: 5, attendance_id: 5, workout_id: 5, duration: 30 },
  { session_id: 6, attendance_id: 6, workout_id: 1, duration: 60 },
  { session_id: 7, attendance_id: 7, workout_id: 2, duration: 45 },
  { session_id: 8, attendance_id: 8, workout_id: 3, duration: 30 },
  { session_id: 9, attendance_id: 9, workout_id: 4, duration: 60 },
  { session_id: 10, attendance_id: 10, workout_id: 5, duration: 45 },
  { session_id: 11, attendance_id: 11, workout_id: 1, duration: 30 },
  { session_id: 12, attendance_id: 12, workout_id: 2, duration: 60 },
  { session_id: 13, attendance_id: 13, workout_id: 3, duration: 45 },
  { session_id: 14, attendance_id: 14, workout_id: 4, duration: 30 },
  { session_id: 15, attendance_id: 15, workout_id: 5, duration: 60 },
  { session_id: 16, attendance_id: 16, workout_id: 1, duration: 45 },
  { session_id: 17, attendance_id: 17, workout_id: 2, duration: 30 },
  { session_id: 18, attendance_id: 18, workout_id: 3, duration: 60 },
  { session_id: 19, attendance_id: 19, workout_id: 4, duration: 45 },
  { session_id: 20, attendance_id: 20, workout_id: 5, duration: 30 },
]

// Complete payments data (not truncated)
const paymentsData = [
  { payment_id: 1, member_id: 1, plan_id: 4, amount: 175.0, payment_method: "Card", transaction_id: "TXN0001" },
  { payment_id: 2, member_id: 2, plan_id: 2, amount: 150.0, payment_method: "Cash", transaction_id: "TXN0002" },
  { payment_id: 3, member_id: 3, plan_id: 3, amount: 100.0, payment_method: "Cash", transaction_id: "TXN0003" },
  { payment_id: 4, member_id: 4, plan_id: 2, amount: 150.0, payment_method: "Other", transaction_id: "TXN0004" },
  { payment_id: 5, member_id: 5, plan_id: 5, amount: 135.0, payment_method: "Cash", transaction_id: "TXN0005" },
]

// Function to load all data
export async function loadAllData() {
  try {
    await connectToDatabase()

    // Clear existing data
    await Plan.deleteMany({})
    await Member.deleteMany({})
    await Workout.deleteMany({})
    await Attendance.deleteMany({})
    await Session.deleteMany({})
    await Payment.deleteMany({})

    // Insert data in the correct order (respecting foreign key relationships)
    console.log("Loading plans...")
    await Plan.insertMany(plansData)

    console.log("Loading members...")
    await Member.insertMany(membersData)

    console.log("Loading workouts...")
    await Workout.insertMany(workoutsData)

    console.log("Loading attendance...")
    await Attendance.insertMany(attendanceData)

    console.log("Loading sessions...")
    await Session.insertMany(sessionsData)

    console.log("Loading payments...")
    await Payment.insertMany(paymentsData)

    console.log("All data loaded successfully!")
    return { success: true, message: "All data loaded successfully!" }
  } catch (error) {
    console.error("Error loading data:", error)
    return { success: false, message: `Error loading data: ${error.message}` }
  }
}

// Function to get the count of records in each collection
export async function getDataCounts() {
  try {
    await connectToDatabase()

    const planCount = await Plan.countDocuments()
    const memberCount = await Member.countDocuments()
    const workoutCount = await Workout.countDocuments()
    const attendanceCount = await Attendance.countDocuments()
    const sessionCount = await Session.countDocuments()
    const paymentCount = await Payment.countDocuments()

    return {
      success: true,
      counts: {
        plans: planCount,
        members: memberCount,
        workouts: workoutCount,
        attendance: attendanceCount,
        sessions: sessionCount,
        payments: paymentCount,
      },
    }
  } catch (error) {
    console.error("Error getting data counts:", error)
    return { success: false, message: `Error getting data counts: ${error.message}` }
  }
}

// Function to add additional members
export async function addAdditionalMembers() {
  try {
    await connectToDatabase()

    // Generate 25 additional members with IDs from 6 to 30
    const newMembers = membersData.slice(5)

    // Insert the new members into the database
    await Member.insertMany(newMembers)

    console.log("Added 25 additional members successfully!")
    return { success: true, message: "Added 25 additional members successfully!" }
  } catch (error) {
    console.error("Error adding additional members:", error)
    return { success: false, message: `Error adding additional members: ${error.message}` }
  }
}
