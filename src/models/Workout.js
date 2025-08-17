import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, default: 0, min: 0 },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Workout ||
  mongoose.model("Workout", WorkoutSchema);



