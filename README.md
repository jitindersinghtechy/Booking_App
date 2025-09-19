Booking App (React Native)
📌 Overview
This project implements several booking-related pages based on the new Figma designs. The goal is to demonstrate the ability to:


Translate UI/UX designs into working React Native screens.
Write clean, maintainable, and reusable code.
Use mock data to simulate booking workflows.
No backend integration is included — the app uses mock booking data (JSON).


✅ Client Requirements Checklist

 UI Implementation → Booking list, booking detail, and my bookings screens implemented.
 Mock data → Stored in assets/bookings.json.
 Technology → React Native (latest) with TypeScript.
 Code structure → Organized into screens/, components/, assets/, types/, etc.
 Reusable components → BookingCard, FilterTabs, BookingHeader, etc.
 No backend integration → Uses mock data only.
 Scalable design → Reusable and modular structure.



🛠 Tech Stack

React Native (TypeScript)
React Navigation (basic navigation)
Mock JSON data (for bookings)
Custom theme (centralized in theme/)



📂 Folder Structure
.
├── src/
│   ├── screens/              # App screens (Bookings, BookingDetail, MyBooking)
│   ├── components/           # Reusable UI components
│   ├── assets/               # Mock data + icons/images
│   ├── types/                # TypeScript types
│   ├── constants/            # Tabs, filters, constants
│   ├── api/                  # Mock API (loads JSON)
│   ├── navigation/           # Navigation setup
│   ├── theme/                # Theme configuration
│   └── helper/               # Utility functions
├── App.tsx                   # Entry point
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
└── README.md                 # Project documentation


🚀 Getting Started
1. Clone the repo
git clone <your-repo-url>
cd <project-folder>

2. Install dependencies
npm install
# or
yarn install

3. Run the app
For iOS:

npx pod-install
npm run ios

For Android:

npm run android


📱 Screenshots
(Add your screenshots inside a new screenshots/ folder and update the paths below)

Bookings Screen
(assets/icons/Avaialblebooking.png)

Booking Detail
(assets/icons/bookingDetails.png)

My Bookings
(assets/icons/Mybooking.png)

🔑 Notes & Assumptions

Only core booking screens were implemented (not every booking status).
Navigation flow kept minimal — enough to demonstrate screen linking.
Mock data is used to simulate API responses.
Some design assumptions were made where Figma details were ambiguous.

📋 Evaluation Criteria
This implementation was developed with attention to:
UI Accuracy → Matches Figma designs.
Code Quality → TypeScript, modular structure, clear separation of concerns.
Reusability → Component-driven design.
User Flow → Smooth navigation between booking screens.
Completeness → Covers booking list, booking detail, and example flows.