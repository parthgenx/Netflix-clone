# 🎬 Netflix Clone - Premium Subscription Platform

> A full-stack streaming platform clone featuring secure subscription payments, user authentication, and cloud-based media management.

![Project Banner](https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg)


## 🚀 Live Demo

👉 **[View Live Application](INSERT_YOUR_VERCEL_LINK_HERE)**

---

## 🌟 Key Features

- **🔐 Secure Authentication:** JWT-based login/signup with secure cookie handling and protected route guarding
- **💳 Payment Integration:** Real-time credit card processing using **Stripe** (Test Mode) with transaction handling and loading feedback
- **🖼️ Media Management:** Profile picture uploads utilizing **Cloudinary** for optimized image storage, resizing, and delivery
- **📱 Responsive UI:** Netflix-style dynamic navbar with transparency effects, toast notifications, and loading states built with **Tailwind CSS**
- **⚡ High Performance:** Deployed on **Vercel** (Frontend) and **Render** (Backend) with configured rewriting rules for SPA routing
- **🗄️ Data Persistence:** User data and subscription status stored securely in **MongoDB Atlas**

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **State/Routing:** React Router DOM, React Hooks
- **HTTP Client:** Axios
- **UX Components:** React Hot Toast, Lucide React Icons

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **File Handling:** Multer & Cloudinary SDK
- **Payments:** Stripe API

### **DevOps & Tools**
- **Version Control:** Git & GitHub
- **Hosting:** Vercel (Frontend), Render (Backend)
- **Cloud Storage:** Cloudinary

---



## ⚙️ Local Installation Setup

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/netflix-clone.git
cd netflix-clone
```

### 2. Install Dependencies

**Frontend:**
```bash
cd Frontend
npm install
```

**Backend:**
```bash
cd ../Backend
npm install
```

### 3. Environment Variables

Create a `.env` file in the **Backend** folder and add the following keys:

```env
# Database Connection
MONGO_URI=your_mongodb_connection_string

# Stripe Payments (Test Mode)
STRIPE_SECRET_KEY=sk_test_...

# Cloudinary Media Storage
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Authentication
JWT_SECRET=your_super_secret_jwt_key
```

Create a `.env` file in the **Frontend** folder:

```env
VITE_STRIPE_KEY=pk_test_...
```

### 4. Run the Application

You need to run both the backend and frontend terminals simultaneously.

**Terminal 1 (Backend):**
```bash
cd Backend
npx nodemon server.js
# Server runs on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd Frontend
npm run dev
# App runs on http://localhost:5173
```

---

## 📂 Project Structure

```
netflix-clone/
├── Backend/
│   ├── config/           # Cloudinary & DB Config
│   ├── models/           # Mongoose Schemas (User.js)
│   ├── routes/           # API Routes (Auth, Payment)
│   ├── middleware/       # Auth & Error Handling
│   └── server.js         # Entry Point
│
└── Frontend/
    ├── src/
    │   ├── components/   # Reusable UI (Header, Row, etc.)
    │   ├── pages/        # Full Pages (Home, Login, Account)
    │   ├── utils/        # Helper Functions
    │   └── App.jsx       # Main Router
    ├── public/           # Static Assets
    └── vercel.json       # Deployment Config
```

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify JWT token

### Payment
- `POST /api/payment/create-checkout-session` - Create Stripe checkout session
- `POST /api/payment/webhook` - Handle Stripe webhooks

### User Profile
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/upload-avatar` - Upload profile picture

---

## 🚢 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

### Backend (Render)

1. Connect your GitHub repository to Render
2. Select "Web Service" as the service type
3. Add environment variables in Render dashboard
4. Set build command: `npm install`
5. Set start command: `node server.js`

---

## 🧪 Testing

### Stripe Test Cards

Use these test card numbers for payment testing:

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- Use any future expiry date and any 3-digit CVC

---

## 📝 Future Enhancements

- [ ] Add video streaming functionality
- [ ] Implement user watchlist and favorites
- [ ] Add content recommendation algorithm
- [ ] Enable multi-language support
- [ ] Implement admin dashboard for content management
- [ ] Add social features (reviews, ratings)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Parth Bhat**

- GitHub: https://github.com/parthgenx
- LinkedIn: https://www.linkedin.com/in/parth-bhat-574095224/
---

## ⚠️ Disclaimer

This project is for **educational purposes only**. Netflix and its logo are trademarks of Netflix, Inc. This project is not affiliated with, endorsed by, or sponsored by Netflix.

---

## 🙏 Acknowledgments

- Netflix UI design inspiration
- Stripe for payment processing documentation
- Cloudinary for media management solutions
- The MERN stack community

---

**If you found this project helpful, please consider giving it a ⭐**

Made with ❤️ by Parth Bhat
