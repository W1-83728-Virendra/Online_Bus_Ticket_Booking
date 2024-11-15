Project Overview

Introduction

The Online Bus Ticket Booking System is a web and mobile application designed to streamline the process of booking bus tickets. Users can browse bus schedules, select seats, and make payments conveniently from their devices. The admin panel allows efficient management of buses, schedules, and bookings.


#Features
 User

    Search and browse available buses by destination and date.
    Select preferred seats using an interactive seat map.
    Secure booking and payment process.

 Admin

    Manage bus schedules, routes, and fares.
    Monitor and update booking details.

 Mobile Application

    React Native app for Android and iOS.
    Features optimized for mobile users.

#Technologies Used
 Backend

    Language: Node.js
    Framework: Express.js
    Database: MySQL

 Frontend

    Language: JavaScript
    Framework: React
    Styling: CSS, Bootstrap

 Mobile Application

    Framework: React Native
    State Management: Redux

#Setup and Installation
 Prerequisites

    Node.js and npm installed.
    MySQL installed and configured.
    Android Studio or Xcode (for React Native).

 Steps

    1. Clone the repository:

         git clone <repository_url>

    2.Navigate to the backend directory and install dependencies:

        cd backend
        npm install

   3.Set up the MySQL database:

        Import the provided database.sql file.
        Configure the .env file with database credentials.

  4.Start the backend server:

        npm start

  5.Navigate to the frontend directory and install dependencies:

        cd ../frontend
        npm install

  6.Start the React frontend:

        npm start

  7.Navigate to the mobile directory and install dependencies:

        cd ../mobile
        npm install

  8.Run the React Native app:

        npx react-native run-android

    (For iOS, use npx react-native run-ios.)



#Project Structure

project/
│
├── backend/        # Backend code (Node.js + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/       # Frontend code (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│
├── mobile/         # React Native app
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── navigation/
│   │   └── App.js
│
└── README.md



#Usage

    1.Visit the web application via the browser:

          http://localhost:3000

    2.Use the React Native app for mobile functionality.


#Future Enhancements

    Integration of payment gateways.
    Real-time tracking of buses.
    Enhanced mobile app features like notifications.


