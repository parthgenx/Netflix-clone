const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const multer = require("multer");
const { storage } = require("./config/cloudinary"); // Import the config we just made
const upload = multer({ storage }); // Initialize the "Mailman" with our storage settings

const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("./middleware/auth");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Load environment variables (api keys, passwords)
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse incoming JSON data

// 1. Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connection Successfull!!!"))
  .catch((err) => console.log(err));

// 2. Basic Route to test server
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // --- NEW: Hash the password ---
    const salt = await bcrypt.genSalt(10); // Generate "salt" (randomness)
    const hashedPassword = await bcrypt.hash(password, salt); // Scramble it
    // ------------------------------

    const newUser = new User({
      email,
      password: hashedPassword, // Save the scrambled version!
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // 3. GENERATE TOKEN (The "Wristband")
    // payload: what we hide inside the token (user's ID)
    // secret: the key from your .env file
    // options: token expires in 1 day
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 4. Send Token to Frontend
    res.status(200).json({ message: "Login Successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Protected Route
app.get("/me", verifyToken, async (req, res) => {
  // If we are here, the middleware has already passed!
  // We can access req.user because the middleware attached it.
  res.json({ message: "This is a protected route", user: req.user });
});

// Add to My List
app.post("/add", verifyToken, async (req, res) => {
  try {
    // 1. Destructure the new complex data
    const { id, title, img } = req.body;
    const userId = req.user.id;

    // 2. Check if user already has this movie (prevent duplicates)
    const user = await User.findById(userId);
    const isAlreadySaved = user.likedMovies.find((movie) => movie.id === id);

    if (isAlreadySaved) {
      return res.status(400).json({ message: "Movie already in list" });
    }

    // 3. Add the full movie object
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { likedMovies: { id, title, img } },
      },
      { new: true }
    );

    res.json({ message: "Movie added to list", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove from My List
// Remove from My List
app.put("/remove", verifyToken, async (req, res) => {
  try {
    const { movieId } = req.body;
    const userId = req.user.id;

    await User.findByIdAndUpdate(
      userId,
      {
        // Remove the item where 'id' matches the movieId we sent
        $pull: { likedMovies: { id: movieId } },
      },
      { new: true }
    );

    res.json({ message: "Movie removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get My List
app.get("/mylist", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ likedMovies: user.likedMovies });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Payment Endpoint
app.post("/payment", async (req, res) => {
  const { id } = req.body; // The token ID from the frontend

  try {
    const payment = await stripe.paymentIntents.create({
      amount: 50000, // 500 INR * 100 paisa
      currency: "inr",
      payment_method: id,
      confirm: true, // Confirm the payment immediately
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // Keep it simple for now
      },
    });

    res.json({ message: "Payment Successful", success: true });
  } catch (error) {
    console.log("Error", error);
    res.json({ message: "Payment Failed", success: false });
  }
});

// UPLOAD ROUTE: Handles the profile picture
app.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Cloudinary URL
    const imageUrl = req.file.path;

    // 3. FIND THE USER AND UPDATE THEIR PROFILE
    // req.user.id comes from the 'verifyToken' middleware
    await User.findByIdAndUpdate(req.user.id, { 
      profilePicture: imageUrl 
    });

    res.json({ 
      success: true, 
      imageUrl: imageUrl, 
      message: "Image saved to database!" 
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

app.get('/api/auth/me', verifyToken, async (req, res) => {
  try {
    // 1. Find the user by the ID in the token
    const user = await User.findById(req.user.id).select('-password'); 
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 2. Send back the user info (including profilePicture!)
    res.json({ success: true, user });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
