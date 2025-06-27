# 🛒 RareCart — Real-Time Limited Edition Drop Platform

RareCart is a GenZ-inspired eCommerce platform for **real-time drops of rare, limited-edition products**.  
Think 🔥 sneaker drops, 💎 digital art, 🛠️ gadget hype — all powered with **VIP logic, live product locking, Socket.IO events**, and a slick modern UI.

---

## 🚀 Features

- 🔐 **Real-time product locking** with socket notifications
- ⏱️ Lock expiration + VIP users get extended lock time
- 🛒 **One-click purchase** after locking
- 📦 **My Orders** with live purchase history
- 🔔 Live **toast notifications** for lock/purchase events
- 👑 Admin dashboard to manage products
- 🧪 Rate-limited locking & abuse prevention
- 📸 Image support for product cards

---

## 🧰 Tech Stack

### 🔧 Backend
- **Node.js**, **Express.js**
- **MongoDB + Mongoose**
- **Socket.IO** for real-time events
- JWT Authentication
- RESTful API

### 🎨 Frontend
- **React.js (Vite/CRA)**
- **TailwindCSS**
- **React Router**
- **React Toastify**

---

## 💻 Getting Started



```bash

1. Clone the repository

git clone https://github.com/NirajV7/rare-cart.git
cd rarecart

2. Install Dependencies
Backend:

cd server
npm install

Frontend:

cd client
npm install

3. Environment Setup

✅ For convenience, a sample .env file is already committed (only for local testing).

.env file at /server:

PORT=5000
JWT_SECRET=your_secret_key_here
ADMIN_KEY=your_admin_key
MONGODB_URI=mongodb://localhost:27017/rarecart

⚠️ Note: In production or public deployment, DO NOT commit .env. Use .env.local and add .env to .gitignore.

4. Seed Database (Users + Products)

Run this from the /server directory to insert:

🔐 1 admin + 4 test users (passwords included)

🛍️ 5 demo products with images and future drop times

node seed.js

▶️ Running the App

🔙 Backend

cd server
npm start

🎯 Frontend

cd client
npm run dev

🧪 Test Credentials
| Role   | Username    | Password |
| ------ | ----------- | -------- |
| Admin  | adminuser   | admin123 |
| User 1 | john\_doe   | user123  |
| User 2 | jane\_smith | user123  |
| User 3 | tech\_guy   | user123  |
| User 4 | sneakerfan  | user123  |

🛠 Admin Panel

Login as adminuser

Visit: http://localhost:5173/admin

Add/Update/Delete products, see drop times and manage inventory

🗨️ Credits
Developed by Niraj V as a personal project to explore:

Real-time systems (Socket.IO)

Advanced React state handling

Authentication & role-based routing

📢 License
MIT License — use it, fork it, remix it ✨


---

Let me know if you'd like a version that includes screenshots or badges (build status, license, stars, etc.) as well.
