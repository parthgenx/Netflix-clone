const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, 
  },
  // --- UPDATED SECTION ---
  likedMovies: [
    {
      id: Number,
      title: String,
      img: String,
    }
  ],
  // -----------------------
});

module.exports = mongoose.model("User", UserSchema);