import mongoose from "mongoose";

const MealSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    name: { type: String, required: true },
    calories: { type: Number, required: true, min: 0 },
    proteinGrams: { type: Number, default: 0, min: 0 },
    carbsGrams: { type: Number, default: 0, min: 0 },
    fatGrams: { type: Number, default: 0, min: 0 },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Meal || mongoose.model("Meal", MealSchema);



