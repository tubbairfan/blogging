import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

export default models.User || mongoose.model("User", UserSchema);
