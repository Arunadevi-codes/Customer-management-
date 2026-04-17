const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// CREATE customer
router.post("/", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const saved = await customer.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// GET single customer
router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.json(customer);
});

// UPDATE customer
router.put("/:id", async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE customer
router.delete("/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;