# 📚 Course Selling Platform (MERN + Stripe)

A full-featured online course-selling platform with secure payments, role-based access (Admin & User), and dynamic content delivery.

## 🚀 Demo

Click thumbnail to play demo video

### 👇 User

[Live Demo](https://manabu-frontend.vercel.app/)
[![User Demo](https://res.cloudinary.com/dqpl3oz88/image/upload/v1754590303/user_zq5owa.png)](https://res.cloudinary.com/dqpl3oz88/video/upload/v1754590050/user_u1tssr.mp4)

### 👇 Admin

[Live Demo](https://manabu-frontend.vercel.app/admin)
[![Admin demo](https://res.cloudinary.com/dqpl3oz88/image/upload/v1754590301/admin_avoclx.png)](https://res.cloudinary.com/dqpl3oz88/video/upload/v1754590047/admin_wk50gn.mp4)

---

## ✨ Features

### 👤 Normal Users

- ✅ Browse and view all available courses
- 🔐 Sign up, login, and logout securely (JWT-based auth)
- 💳 Buy courses using **Stripe payments**
- 📦 Instant course access after payment
- 📘 Access "My Courses" page to view purchased content

### 🛠️ Admin

- 🎓 Create, edit, delete courses
- 🗂️ Add/remove course sections and lectures
- 📈 See enrolled users
- 🚀 Instant update to frontend with no page reload

---

## ⚙️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + Jotai
- **Backend**: Express.js + MongoDB + Mongoose + Stripe
- **Auth**: JWT Tokens
- **Storage**: Cloudinary for thumbnails
- **Deployment**: Vercel (frontend) + Render (backend)

---

## 🛠️ Local Setup Instructions

```bash
# Clone the repo
git clone https://github.com/akash2003git/manabu.git
cd manabu

# Install dependencies
cd backend
npm install

cd ../frontend
npm install
```

### Enviornment Variables

frontend/.env

```bash
VITE_REACT_APP_BACKEND_BASEURL=
VITE_STRIPE_PUBLIC_KEY=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

backend/.env

```bash
MONGO_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
FRONTEND_URL=
STRIPE_WEBHOOK_SECRET=
```
