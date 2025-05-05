import mongoose from "mongoose"

const AttendanceSchema = new mongoose.Schema({
  attendance_id: {
    type: Number,
    required: true,
    unique: true,
  },
  member_id: {
    type: Number,
    required: true,
    ref: "Member",
  },
  date: {
    type: Date,
    required: true,
  },
  check_in: {
    type: Date,
    required: true,
  },
  check_out: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.check_in
      },
      message: "Check-out time must be after check-in time",
    },
  },
})

export default mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema)
