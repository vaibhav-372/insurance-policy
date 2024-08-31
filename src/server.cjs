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

// Defining the Agent schema
const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Create a model from the schema
const Agent = mongoose.model('Agent', agentSchema);

// Routes

// Get all policies
app.get('/api/policies', async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new policy
app.post('/api/policies', async (req, res) => {
  const { customerName, renewalDate, phoneNo, policyNo, planType, mailId, status, message } = req.body;

  const strippedRenewalDate = new Date(renewalDate);
  strippedRenewalDate.setHours(0, 0, 0, 0);

  try {
    const newPolicy = new Policy({
      customerName,
      renewalDate: strippedRenewalDate,
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
    console.error('Error saving policy:', err);
    res.status(500).json({ message: 'Failed to create policy', error: err.message });
  }
});

// Create a new agent
app.post('/api/agents', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newAgent = new Agent({ name, email, password });
    await newAgent.save();
    res.status(201).json(newAgent);
  } catch (err) {
    console.error('Error saving agent:', err);
    res.status(500).json({ message: 'Failed to create agent' });
  }
});

// Get all agents
app.get('/api/agents', async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// Update an agent by ID
app.put('/api/agents/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedAgent = await Agent.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!updatedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.json(updatedAgent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating agent' });
  }
});


// Agent login
app.post('/api/agents/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const agent = await Agent.findOne({ email });

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    if (agent.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', agent });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Dashboard Endpoints

// Get the count of total policies
app.get('/api/admin/total-policies', async (req, res) => {
  try {
    const totalPolicies = await Policy.countDocuments();
    res.json({ totalPolicies });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get the count of policies in the current year
app.get('/api/admin/yearly-policies', async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const yearlyPolicies = await Policy.countDocuments({
      date: {
        $gte: new Date(currentYear, 0, 1),
        $lt: new Date(currentYear + 1, 0, 1)
      }
    });
    res.json({ yearlyPolicies });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get the count of policies in the current month
app.get('/api/admin/current-month-policies', async (req, res) => {
  try {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthPolicies = await Policy.countDocuments({
      date: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lt: new Date(currentYear, currentMonth + 1, 1)
      }
    });
    res.json({ currentMonthPolicies });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get policies grouped by year for bar chart
app.get('/api/admin/policies-by-year', async (req, res) => {
  try {
    const policies = await Policy.aggregate([
      {
        $group: {
          _id: { $year: "$date" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    res.json(policies.map(policy => ({ year: policy._id, count: policy.count })));
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
