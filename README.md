# Inspirational Quotes Website

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [License](#license)
- [Contact](#contact)

## Introduction
This website provides users with daily inspirational quotes. Users can register or log in to receive a new quote every day at 9:00 AM.

## Features
- User registration and login
- Daily inspirational quotes sent at 9:00 AM
- Secure authentication
- Responsive design

## Tech Stack
### Frontend
- React
- Tailwind CSS

### Backend
- Express.js
- MongoDB Atlas
- Postman (for API testing)

### Deployment
- Frontend: Netlify
- Backend: Render.com

## Setup and Installation

### Prerequisites
- Node.js
- MongoDB Atlas account
- Netlify account
- Render.com account

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/laxmi01345/inspirational-gmail-quotes.git
    cd inspirational-gmail-quotes
    ```

2. **Backend setup:**
    ```sh
    cd backend
    npm install
    ```

    - Create a `.env` file in the `backend` directory and add your MongoDB connection string and other environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=4000
    ```

    - Set up the scheduled job for sending daily emails. Add the following code in your backend setup:
    ```js
    const schedule = require('node-schedule');
    const { User } = require('./models/User');  // Adjust the path as necessary
    const { sendMail } = require('./utils/sendMail');  // Adjust the path as necessary

    schedule.scheduleJob('20 9 * * *', async () => {
        try {
            const users = await User.find();
            await sendMail(users);
        } catch (error) {
            console.error('Error sending daily emails:', error);
        }
    });
    ```

    - Start the backend server:
    ```sh
    npm start
    ```

3. **Frontend setup:**
    ```sh
    cd frontend
    npm install
    ```

    - Start the frontend development server:
    ```sh
    npm start
    ```

## Usage

- Visit your deployed frontend URL.
- Register or log in to your account.
- Receive daily inspirational quotes at 9:00 AM.

## API Documentation

- The API documentation can be tested using Postman.
- The base URL for the backend is hosted on Render.com.

### Endpoints
- **POST /register:** Register a new user
- **POST /login:** Log in an existing user
- **GET /quote:** Get the daily inspirational quote (protected route)
- **GET /user:** Get the user details
- **POST /logout:** Log out from the account

## Deployment

### Frontend
- Deploy the frontend application on Netlify.
- Ensure the frontend environment variables are set correctly in the Netlify dashboard.

### Backend
- Deploy the backend application on Render.com.
- Ensure the backend environment variables are set correctly in the Render.com dashboard.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- **GitHub:** [https://github.com/laxmi01345](https://github.com/laxmi01345)
