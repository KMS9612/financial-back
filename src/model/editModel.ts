import mongoose from "mongoose";

const Day = new mongoose.Schema({
  day: { type: String, require: true },
  value: {
    financial_type: { type: String, require: true },
    amount: { type: Number, require: true },
    place: { type: String, require: true },
  },
});

const Month = new mongoose.Schema({
  month: { type: String, require: true },
  date: {
    type: [Day],
    default: [],
  },
});

const Edit = new mongoose.Schema({
  email: { type: String, require: true },
  data: { type: [Month], default: [] },
});

export const EditSchema = mongoose.model("Edit", Edit);
