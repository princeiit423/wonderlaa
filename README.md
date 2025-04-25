# 🏡 Wonderla – Your Getaway Booking Platform

**Wonderla** is a full-stack web application designed to streamline property listings and bookings, similar to Airbnb. It enables users to explore, list, and book accommodations with a smooth and elegant interface powered by EJS and Bootstrap.

---

## 🔧 Tech Stack

- **Frontend**: EJS Templating, Bootstrap 5, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: Passport.js (Local Strategy)
- **File Uploads**: Multer + Cloudinary
- **Templating Engine**: EJS

---

## ✨ Features

- 📝 User Registration & Login (with session support)
- 📍 Add, Edit, Delete Listings
- 📸 Upload and manage property images
- 💬 Post and manage Reviews
- 🧑 Personalized user dashboard
- 🌐 Mobile-responsive UI using Bootstrap
- 📦 RESTful routing

---

## 📂 Project Structure

wonderla/ ├── models/ # Mongoose models
├── views/ # EJS templates 
├── public/ # Static assets (CSS, JS, images)
├── app.js # Main application entry point
├── package.json 
└── .env # Environment variables


---

## ⚙️ Installation

1. **Clone the repository:**
git clone https://github.com/your-username/wonderla.git
cd wonderlaa

2. **Install dependencies:**
npm install

3. **Set up environment variables:**
DATABASE_URL=your_mongo_db_connection
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SECRET=session_secret

4.**Run the application:**
npx nodemon app.js or start app.js

----------------------------------------------------------
📸 Screenshots

![WonderLust - Google Chrome 25-04-2025 19_50_39](https://github.com/user-attachments/assets/8ee568d4-58d9-4ad1-91c0-e295107faaa0)
![WonderLust - Google Chrome 25-04-2025 19_50_25](https://github.com/user-attachments/assets/4879678c-dcc9-4329-a791-6480ae9c1e45)
![WonderLust - Google Chrome 25-04-2025 19_49_54](https://github.com/user-attachments/assets/aa0f83df-71b5-48e8-9a78-abc6352d05ac)

-----------------------------------------------------------
##🚀 Deployment
You can deploy Wonderla on:

Render

Heroku

Railway

Make sure to configure environment variables on the platform.

-----------------------------------------------------------
🧑‍💻 Author
Faiz Hussain
📧 faiz18513@gmail.com
🔗 github.com/princeiit423

📄 License
Licensed under the MIT License
