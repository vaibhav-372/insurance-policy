const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Connection to MongoDB
mongoose
  .connect("mongodb://localhost:27017/insurance-policy", {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Defining the Policy schema
const policySchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  renewalDate: { type: String, required: true },
  phoneNo: { type: String, required: true },
  policyNo: { type: String, required: true },
  planType: { type: String, required: true },
  mailId: { type: String, required: true },
  status: { type: String },
  message: { type: String },
  date: { type: Date, default: Date.now }
});

// Create a model from the schema
const Policy = mongoose.model('Policy', policySchema);

// Routes
app.get('/api/policies', async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/policies', async (req, res) => {
  const { customerName, renewalDate, phoneNo, policyNo, planType, mailId, status, message } = req.body;
  console.log(customerName, renewalDate, phoneNo, policyNo);

  try {
    const newPolicy = new Policy({
      customerName,
      renewalDate,
      phoneNo,
      policyNo,
      planType,
      mailId,
      status,
      message,
      date: new Date(),
    });

    await newPolicy.save();
    res.status(201).json(newPolicy);
  } catch (err) {
    console.error('Error saving policy:', err); // Log the actual error
    res.status(500).json({ message: 'Failed to create policy', error: err.message });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
