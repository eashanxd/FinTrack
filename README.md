# 💰 FinTrack

<p align="center">
  <strong>A modern full-stack personal finance tracker built with React and Appwrite.</strong>
  <br />
  Track your income and expenses, visualize spending trends, and manage your finances through a clean, responsive interface.
</p>

<p align="center">
  <a href="https://YOUR-VERCEL-URL.vercel.app"><strong>🌐 Live Demo</strong></a>
  •
  <a href="https://github.com/YOUR_USERNAME/FinTrack"><strong>📂 GitHub Repository</strong></a>
</p>

---

## 📖 Overview

FinTrack is a modern personal finance management application designed to simplify tracking daily income and expenses. It combines a responsive React frontend with Appwrite's backend services to provide secure authentication, cloud-based data storage, and insightful financial analytics.

The project was built to strengthen full-stack development skills while creating a real-world application with a polished user experience.

---

## ✨ Features

### 🔐 Authentication

* Secure user registration and login
* Persistent login sessions
* User-specific financial data

### 💳 Transaction Management

* Add transactions
* Edit transactions
* Delete transactions
* Organized transaction history

### 📊 Analytics Dashboard

* Income vs Expense summary
* Spending insights
* Financial overview
* Interactive visualizations

### ☁️ Cloud Backend

* Appwrite Authentication
* Appwrite Database
* Secure cloud storage
* Session management

### 📱 Responsive Design

* Mobile-friendly
* Tablet support
* Desktop optimized

### 🎨 Modern UI

* Clean interface
* Smooth animations
* Responsive interactions
* Intuitive user experience

---

## 🛠️ Tech Stack

| Category            | Technologies                 |
| ------------------- | ---------------------------- |
| **Frontend**        | React, JavaScript, Vite, CSS |
| **Backend**         | Appwrite                     |
| **Authentication**  | Appwrite Auth                |
| **Database**        | Appwrite Database            |
| **Deployment**      | Vercel                       |
| **Version Control** | Git & GitHub                 |

---

## 📸 Screenshots

> Add screenshots after deployment.

| Login                      | Dashboard                      |
| -------------------------- | ------------------------------ |
| ![](screenshots/login.png) | ![](screenshots/dashboard.png) |

| Transactions                      | Analytics                      |
| --------------------------------- | ------------------------------ |
| ![](screenshots/transactions.png) | ![](screenshots/analytics.png) |

---

## 🚀 Live Demo

Visit the deployed application here:

**👉 https://YOUR-VERCEL-URL.vercel.app**


## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/eashanxd/FinTrack.git
```

Move into the project:

```bash
cd FinTrack
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file using the provided `.env.example`.

Example:

```env
VITE_APPWRITE_ENDPOINT=
VITE_APPWRITE_PROJECT_ID=
VITE_APPWRITE_DATABASE_ID=
VITE_APPWRITE_COLLECTION_ID=
```

Never commit your actual `.env` file.

## 📁 Project Structure

```
FinTrack/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── package.json
└── README.md
```

## 🚀 Deployment

The application is deployed using **Vercel**, making it easily accessible from any device while integrating seamlessly with Appwrite Cloud.

## 📚 What I Learned

Developing FinTrack provided hands-on experience with:

* Building modern React applications
* Component-based architecture
* State management
* Appwrite Authentication
* CRUD operations
* Cloud databases
* Session management
* Responsive UI design
* Deploying applications with Vercel
* Git and GitHub workflows

## 🔮 Future Improvements

* Budget planning
* Savings goals
* Dark mode
* Export transactions
* Monthly reports
* Spending notifications
* Category management
* Multi-currency support

## 🤝 Contributing

Contributions, ideas, and suggestions are always welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.

## ⭐ Support

If you found this project useful, consider giving it a **⭐** on GitHub.

## 📄 License

This project is licensed under the **MIT License**.

<p align="center">
Made with ❤️ using React, Appwrite, and Vercel.
</p>
