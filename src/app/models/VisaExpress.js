// src/app/models/VisaExpress.js (অথবা আপনার মডেল ফাইল)
import mongoose from "mongoose";

const VisaSchema = new mongoose.Schema({
  country: String,
  flag: String,
  code: String
});

// এখানে তৃতীয় প্যারামিটার হিসেবে কালেকশনের নাম 'countries' লিখে দিন
const VisaExpress = mongoose.models.VisaExpress || mongoose.model("VisaExpress", VisaSchema, "countries");

export default VisaExpress;