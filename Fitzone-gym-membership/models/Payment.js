import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema({
  payment_id: {
    type: Number,
    required: true,
    unique: true,
  },
  member_id: {
    type: Number,
    required: true,
    ref: "Member",
  },
  plan_id: {
    type: Number,
    required: true,
    ref: "Plan",
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  payment_method: {
    type: String,
    required: true,
    enum: ["Cash", "Card", "Zelle", "Other"],
  },
  transaction_id: {
    type: String,
    maxlength: 30,
  },
})

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema)
