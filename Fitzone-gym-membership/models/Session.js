import mongoose from "mongoose"

const SessionSchema = new mongoose.Schema({
  session_id: {
    type: Number,
    required: true,
    unique: true,
  },
  attendance_id: {
    type: Number,
    required: true,
    ref: "Attendance",
  },
  workout_id: {
    type: Number,
    required: true,
    ref: "Workout",
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
})

export default mongoose.models.Session || mongoose.model("Session", SessionSchema)
