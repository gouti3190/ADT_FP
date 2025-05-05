import mongoose from "mongoose"

const MemberSchema = new mongoose.Schema({
  member_id: {
    type: Number,
    required: true,
    unique: true,
  },
  plan_id: {
    type: Number,
    required: true,
    ref: "Plan",
  },
  first_name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    maxlength: 30,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["M", "F", "O"],
  },
  address: {
    type: String,
    maxlength: 99,
  },
  join_date: {
    type: Date,
    required: true,
  },
  emergency_contact_no: {
    type: Number,
    required: true,
  },
  emergency_contact: {
    type: String,
    required: true,
    maxlength: 50,
  },
})

export default mongoose.models.Member || mongoose.model("Member", MemberSchema)
