import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);


