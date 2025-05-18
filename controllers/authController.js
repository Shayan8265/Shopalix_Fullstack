const User = require('../models/User');
const Order = require('../models/Order');

// Create a new user (called during login if not found)
exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "User already exists", user: existing });
    }

    const newUser = new User({ email });
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get user info + orders by email
exports.getUserData = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });
    const orders = await Order.find({ userEmail: email }).sort({ placedAt: -1 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user, orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user info
exports.updateUser = async (req, res) => {
  try {
    const email = req.params.email;
    const { name, address } = req.body;

    const user = await User.findOneAndUpdate({ email }, { name, address }, { new: true, upsert: true });

    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { userEmail, orderId, name, address, items } = req.body;

    const order = new Order({ userEmail, orderId, name, address, items });
    await order.save();

    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
