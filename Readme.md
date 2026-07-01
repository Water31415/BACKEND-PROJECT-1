# 🎥 Video Streaming Backend

A scalable and secure backend for a video streaming platform built with **Node.js**, **Express.js**, and **MongoDB**. It provides user authentication, media upload, and video management APIs.

---

## 🚀 Features

- 🔐 JWT-based User Authentication
- 👤 User Registration & Login
- 🎥 Video Upload & Management
- 🖼️ Image Uploads with Multer & Cloudinary
- ☁️ Cloud Storage Integration
- 📦 MongoDB Database with Mongoose
- 🛡️ Secure Password Hashing
- 📝 RESTful API Architecture
- 🧪 API Testing using Postman

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **File Upload:** Multer
- **Cloud Storage:** Cloudinary
- **Testing:** Postman

---

## 📂 Project Structure

```
video-streaming-backend/
│── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   └── app.js
│
│── public/
│── .env
│── package.json
│── server.js
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/video-streaming-backend.git
cd video-streaming-backend
```

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Start the server

```bash
npm run dev
```

Server will start on:

```
http://localhost:8000
```

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/users/register` | Register User |
| POST | `/api/v1/users/login` | Login User |
| POST | `/api/v1/users/logout` | Logout User |

### User

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/users/current-user` | Get Current User |
| PATCH | `/api/v1/users/update-account` | Update User Details |

### Videos

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/videos` | Upload Video |
| GET | `/api/v1/videos` | Get All Videos |
| GET | `/api/v1/videos/:id` | Get Video by ID |
| PATCH | `/api/v1/videos/:id` | Update Video |
| DELETE | `/api/v1/videos/:id` | Delete Video |

---

## 🔒 Authentication

Protected routes require a JWT Access Token.

```
Authorization: Bearer <your_access_token>
```

---

## 🧪 API Testing

The APIs were tested using **Postman**.

---

## 🔮 Future Improvements

- Like & Dislike System
- Comments
- Subscriptions
- Watch History
- Video Search & Filters
- Playlists
- Video Streaming with Adaptive Quality
- Notifications

---

## 👨‍💻 Author

**Sarthak Dhiman**

GitHub: https://github.com/Water31415

---

## ⭐ If you found this project useful, consider giving it a star!