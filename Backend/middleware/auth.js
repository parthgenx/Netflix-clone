const jwt = require('jsonwebtoken');

// The "Next" parameter allows the request to continue to the actual route
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  // 1. Check if the header exists
  if (!authHeader) {
    return res.status(401).json({ message: "Access Denied: No Token Provided!" });
  }

  // 2. The header usually looks like "Bearer <token_string>", so we split it
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access Denied: Malformed Token!" });
  }

  try {
    // 3. Verify the token using our secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Attach the user data to the request so the route can use it
    req.user = verified;
    
    // 5. Allow the user to proceed
    next(); 
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = verifyToken;