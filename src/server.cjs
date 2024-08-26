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
  renewalDate: { type: Date, required: true },
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




// Define the Agent schema
const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
});

// Create a model from the schema
const Agent = mongoose.model('Agent', agentSchema);




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

  const strippedRenewalDate = new Date(renewalDate);
    strippedRenewalDate.setHours(0, 0, 0, 0);

  try {
    const newPolicy = new Policy({
      customerName,
      renewalDate:strippedRenewalDate,
      phoneNo,
      policyNo,
      planType,
      mailId,
      status,
      message,
      date: new Date().setHours(0, 0, 0, 0),
    });

    await newPolicy.save();
    res.status(201).json(newPolicy);
  } catch (err) {
    console.error('Error saving policy:', err); // Log the actual error
    res.status(500).json({ message: 'Failed to create policy', error: err.message });
  }
});


// POST route to save a new agent
app.post('/api/agents', async (req, res) => {
  const { name, phoneNumber, email } = req.body;
  console.log(name, phoneNumber, email)
  console.log("Agent saved")

  try {
    const newAgent = new Agent({ name, phoneNumber, email });
    await newAgent.save();
    res.status(201).json(newAgent);
  } catch (err) {
    console.error('Error saving agent:', err);
    res.status(500).json({ message: 'Failed to create agent' });
  }
});

app.get('/api/agents', async (req, res) => {
  try{
    const agent = await Agent.find();
    res.json(agent);
  }
  catch (error){
    res.status(500).json({ message: 'Server Error' });
  }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
