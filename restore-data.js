const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://mahesh_21:teI4gVKu0Vnzqy2y@cluster0.gnikcjh.mongodb.net/vbelievers?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI);

const appSchema = new mongoose.Schema({
  regNo: String, name: String, fatherName: String, dob: String,
  qualification: String, circleDate: String, gender: String,
  branch: String, email: String, district: String, phone: String,
  bridge: String, status: String,
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Application = mongoose.model("Application", appSchema);

// Sample data to restore
const sampleData = [
  {
    regNo: "001",
    name: "John Doe",
    fatherName: "James Doe",
    dob: "1990-05-15",
    qualification: "B.Tech",
    circleDate: "2026-03-15",
    gender: "Male",
    branch: "Kurnool",
    email: "john@example.com",
    district: "Kurnool",
    phone: "9876543210",
    bridge: "Veera",
    status: "Follow Up"
  },
  // Add more records as needed
];

async function restoreData() {
  try {
    await Application.deleteMany({});
    await Application.insertMany(sampleData);
    console.log("✅ Data restored successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

restoreData();
