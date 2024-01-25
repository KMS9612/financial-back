import mongoose from "mongoose";

const FixedData = new mongoose.Schema({
  email: { type: String, require: true },
  income: { type: Number, require: true },
  saving: { type: Number, require: true },
  fixed: { type: Number, require: true },
});

export const FixedSchema = mongoose.model("Fixed", FixedData);
