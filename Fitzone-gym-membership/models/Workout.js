import mongoose from "mongoose"

const WorkoutSchema = new mongoose.Schema({
  workout_id: {
    type: Number,
    required: true,
    unique: true,
  },
  workout_name: {
    type: String,
    required: true,
    maxlength: 20,
  },
  muscle_concentrated: {
    type: String,
    required: true,
    maxlength: 20,
  },
  description: {
    type: String,
    maxlength: 99,
  },
  calories_burned_avg: {
    type: Number,
    required: true,
    min: 0,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ["E", "M", "H"],
  },
})

export default mongoose.models.Workout || mongoose.model("Workout", WorkoutSchema)
