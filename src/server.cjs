const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const adminCredentials = {
  username: "admin",
  password: "password123",
};

// Connection to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/insurance-policy", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Defining schemas
const renewalSchema = new mongoose.Schema({
  renewalDate: { type: Date, required: true },
  amount: { type: String, required: true }, // 'pending' or numeric value
});

const policySchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  renewalDate: { type: Date, required: true },
  phoneNo: { type: String, required: true },
  policyNo: { type: String, required: true },
  planType: { type: String, required: true },
  mailId: { type: String, required: true },
  agentName: { type: String },
  amount: { type: Number },
  renewals: [renewalSchema],
  date: { type: Date, default: Date.now },
});

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// Create models from schemas
const Policy = mongoose.model("Policy", policySchema);
const Agent = mongoose.model("Agent", agentSchema);

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === adminCredentials.username &&
    password === adminCredentials.password
  ) {
    const token = jwt.sign({ username }, "your_jwt_secret", {
      expiresIn: "12h",
    });
    res.status(200).json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Routes

// Get all policies
app.get("/api/policies", async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create a new policy
app.post("/api/policies", async (req, res) => {
  const {
    customerName,
    renewalDate,
    phoneNo,
    policyNo,
    planType,
    mailId,
    agentName,
    amount,
  } = req.body;

  const strippedRenewalDate = new Date(renewalDate);
  strippedRenewalDate.setHours(0, 0, 0, 0);

  try {
    const initialRenewal = {
      renewalDate: strippedRenewalDate,
      amount, // Assuming initial amount is provided and not 'pending'
    };

    const newPolicy = new Policy({
      customerName,
      renewalDate: strippedRenewalDate,
      phoneNo,
      policyNo,
      planType,
      mailId,
      agentName,
      amount,
      date: new Date(),
      renewals: [initialRenewal],
    });

    await newPolicy.save();
    res.status(201).json(newPolicy);
  } catch (err) {
    console.error("Error saving policy:", err);
    res
      .status(500)
      .json({ message: "Failed to create policy", error: err.message });
  }
});

// Create a new agent
app.post("/api/agents", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new Agent({ name, email, password: hashedPassword });

    await newAgent.save();

    res.status(201).json(newAgent);
  } catch (err) {
    console.error("Error saving agent:", err);
    res.status(500).json({ message: "Failed to create agent" });
  }
});

// Get all agents
app.get("/api/agents", async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update an agent by ID
app.put("/api/agents/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const updatedAgent = await Agent.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    if (!updatedAgent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    res.json(updatedAgent);
  } catch (error) {
    res.status(500).json({ message: "Error updating agent" });
  }
});

// Agent login
app.post("/api/agents/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const agent = await Agent.findOne({ email });

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    const isMatch = await bcrypt.compare(password, agent.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { name: agent.name, email: agent.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update policy by ID
app.put("/api/policies/:id", async (req, res) => {
  const { id } = req.params;
  const { amount, renewalDate } = req.body;

  try {
    // Find the policy by ID
    const policy = await Policy.findById(id);

    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    // Update the amount of the last renewal to 'pending'
    if (policy.renewals.length > 0) {
      policy.renewals[policy.renewals.length - 1].amount = "pending";
    }

    // Update the last known renewal date and amount
    policy.renewalDate = new Date(renewalDate);
    policy.amount = amount;

    // Add a new renewal record
    // policy.renewals.push({
    //   renewalDate: new Date(renewalDate),
    //   amount: 'pending' // New renewal entry is always 'pending'
    // });

    // Save the updated policy
    await policy.save();

    res
      .status(200)
      .json({ message: "Policy renewal updated successfully", policy });
  } catch (error) {
    console.error("Error updating policy renewal:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Admin Dashboard Endpoints

// Get the count of total policies
app.get("/api/admin/total-policies", async (req, res) => {
  try {
    const totalPolicies = await Policy.countDocuments();
    res.json({ totalPolicies });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get the count of policies in the current year
app.get("/api/admin/yearly-policies", async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const yearlyPolicies = await Policy.countDocuments({
      date: {
        $gte: new Date(currentYear, 0, 1),
        $lt: new Date(currentYear + 1, 0, 1),
      },
    });
    res.json({ yearlyPolicies });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get the count of policies in the current month
app.get("/api/admin/current-month-policies", async (req, res) => {
  try {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthPolicies = await Policy.countDocuments({
      date: {
        $gte: new Date(currentYear, currentMonth, 1),
        $lt: new Date(currentYear, currentMonth + 1, 1),
      },
    });
    res.json({ currentMonthPolicies });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get current month renewals
app.get("/api/admin/current-month-renewals", async (req, res) => {
  try {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthRenewals = await Policy.aggregate([
      { $unwind: "$renewals" },
      {
        $match: {
          "renewals.renewalDate": {
            $gte: new Date(currentYear, currentMonth, 1),
            $lt: new Date(currentYear, currentMonth + 1, 1),
          },
        },
      },
      {
        $group: {
          _id: null,
          renewals: { $push: "$renewals" },
        },
      },
    ]);
    res.json(currentMonthRenewals);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Start server
const port = 5050;
app.listen(port, () => console.log(`Server running on port ${port}`));
