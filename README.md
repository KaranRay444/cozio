
# 🏡 Cozio - Vacation Rental Platform

**Live Demo:** [https://cozio.onrender.com/](https://cozio.onrender.com/)

<div align="center"> 
  <img width="941" height="408" alt="Cozio Home Page" src="https://github.com/user-attachments/assets/d066a39d-4bba-42ee-95f4-6a60cd5e7da1" />
</div>

## 📖 Description
**Cozio** is a full-stack web application inspired by Airbnb. It allows users to browse, list, and review vacation rentals, villas, and unique stays. The platform features user authentication, image uploads, interactive maps, and a responsive design.

This project was built to understand the core concepts of RESTful APIs, MVC architecture, and database management using the **MERN** stack (MongoDB, Express, Node.js).

## ✨ Key Features
* **User Authentication:** Secure Signup and Login using Passport.js.
* **CRUD Operations:** Users can Create, Read, Update, and Delete listings.
* **Review System:** Users can leave ratings and reviews for listings.
* **Image Uploads:** Cloud storage integration using Cloudinary.
* **Interactive Maps:** Location markers powered by Ola Maps / MapLibre.
* **Responsive Design:** Optimized for mobile and desktop using Bootstrap.
* **MVC Architecture:** Clean code structure separating Models, Views, and Controllers.

## 🛠️ Tech Stack
* **Frontend:** EJS (Embedded JavaScript), Bootstrap 5, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud Database)
* **Authentication:** Passport.js (Local Strategy)
* **Cloud Storage:** Cloudinary
* **Maps:** Ola Maps SDK / MapLibre GL
* **Tools:** VS Code, Git, Render (Deployment)

## 📂 Folder Structure
```text
Cozio/
├── controllers/    # Route logic (MVC)
├── init/           # Database seeding scripts
├── models/         # Mongoose Database Schemas
├── public/         # Static files (CSS, JS, Images)
├── routes/         # Express Routes (Listings, Reviews, Users)
├── utils/          # Helper functions & Error handling
├── views/          # EJS Templates
├── app.js          # Main entry point
├── cloudConfig.js  # Cloudinary configuration
└── middleware.js   # Custom middlewares (Auth, Validation)

```

## 🚀 Getting Started Locally

If you want to run this project on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone [https://github.com/KaranRay444/cozio.git](https://github.com/KaranRay444/cozio.git)
cd cozio

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Set up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_ola_maps_api_key
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

```

### 4. Initialize Database (Optional)

If you want to load sample data:

```bash
node init/index.js

```

### 5. Run the Server

```bash
node app.js

```

Open your browser and go to `http://localhost:8080`

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

## 👤 Author

**Karan Rajbhar**

* GitHub: [KaranRay444](https://github.com/KaranRay444)
