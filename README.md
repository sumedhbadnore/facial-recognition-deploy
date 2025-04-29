# Facial Recognition Web App

Welcome to the Facial Recognition Web App Demo!  
This project demonstrates real-time facial recognition using webcam feed and image uploads.  
Built with **React**, **TypeScript**, **Redux**, **Bootstrap**, and **Face-API.js** for frontend face detection.

---

## 🚀 Live Demo

👉 [Click here to view the live site!](https://facial-recognition-deploy-theta.vercel.app)

---

## 📸 Features

- Upload an image and detect faces instantly
- See predicted **Age**, **Gender**, and **Top Emotion** for each detected face
- Responsive design — works across desktop, tablet, and mobile
- Real-time Webcam face detection (future feature-ready)
- Bootstrap styled UI for clean, professional layout
- Clear Image button to reset and upload another picture

---

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Redux** (for state management)
- **Face-API.js** (for facial recognition, age, gender, emotion detection)
- **Bootstrap 5** (for styling and responsive design)
- **Vercel** (for hosting and deployment)

---

## 📂 Project Structure

- /public/models/ → Pre-trained Face-API.js models
- /src/components/ → React components (UploadImage, WebcamView)
- /src/utils/ → Face detection utilities
- /src/redux/ → Redux store and slices
- /src/ → Main application structure

---

## ⚙️ Setup Instructions (If you want to run locally)

1. Clone the repository:

```bash
git clone https://github.com/your-username/facial-recognition-webapp.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

Visit http://localhost:3000 in your browser!

✅ Remember to ensure your /public/models/ folder is present to load Face-API models correctly.
