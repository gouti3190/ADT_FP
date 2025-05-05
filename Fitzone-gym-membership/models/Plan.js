import mongoose from "mongoose"

const PlanSchema = new mongoose.Schema({
  plan_id: {
    type: Number,
    required: true,
    unique: true,
  },
  plan_name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  description: {
    type: String,
    maxlength: 99,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  duration_days: {
    type: Number,
    required: true,
    min: 1,
  },
})

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema)
