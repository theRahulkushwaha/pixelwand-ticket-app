# 🎟️ React Native Ticket Booking App

A beautifully crafted **Ticket Booking App** using **React Native + Expo**. Users can search for events, view details, select seats, and manage their bookings—all in a sleek, modern dark UI.

---

### Screenshots
<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center">
  <img src="https://github.com/user-attachments/assets/41430c4f-29cb-4e5b-989a-322ecd971d70" width="200" alt="Home Screen" />
  <img src="https://github.com/user-attachments/assets/353c5b6f-49c4-4a8a-a146-15a3a806565b" width="200" alt="Search Screen" />
  <img src="https://github.com/user-attachments/assets/fda92eaf-3c57-4882-bc3b-6e5f93169a6f" width="200" alt="Movie Details" />
  <img src="https://github.com/user-attachments/assets/85d89906-fd25-4832-b084-8477f27f0d2b" width="200" alt="Seat Selection" />
  <img src="https://github.com/user-attachments/assets/a234c587-9744-4870-aa6e-95fe6d8829a0" width="200" alt="Bookings Screen" />
</div>

## ✨ Features

- 🔍 **Search Events** by name
- 📅 **Event Detail Page** with image, date, location, price, and description
- ➕➖ **Ticket Counter** with quantity selection
- 🪑 **Interactive Seat Selection** (selectable, highlighted)
- 💾 **Booking Summary Page** with cancel option
- 🎨 **Modern Dark UI** using custom color palette

---

## � Tech Stack

| Layer         | Technology                        |
|---------------|------------------------------------|
| Language      | TypeScript                        |
| Framework     | React Native (with Expo)          |
| Navigation    | React Navigation (stack + tabs)   |
| State Mgmt    | React Context API                 |
| Icons         | React Native Vector Icons         |
| Styling       | StyleSheet + Custom Dark Theme    |

---

```bash
## 📂 Folder Structure
├── App.tsx
├── navigation/
│   ├── Index.tsx
│   └── HomeStackNavigator.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── EventDetailScreen.tsx
│   ├── SeatSelectionScreen.tsx
│   └── BookingsScreen.tsx
├── context/
│   └── BookingContext.tsx
├── services/
│   └── api.ts
├── assets/
│   └── ...
├── screenshots/
│   └── home.png, event-detail.png, seat-selection.png, bookings.png

```
## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/theRahulkushwaha/pixelwand-ticket-app.git
cd ticket-booking-app
npm install
npm start
# or
npx expo start
```
## View on Mobile
Download Expo Go app from Play Store / App Store and scan the QR code from the terminal/browser.

## 🎨 UI Theme
| Element         | Color                        |
|---------------|------------------------------------|
| Background      | #000000                        |
| Sub-background/Card     | #222222          |
| Text    | #f3f3f3   |
| Header/Tab Bar    | #1d1d1d                 |
| Active Tab Icon         | #b9ed3c         |
| Seat Button       | #c0f740    |
| Cancel Button       | #ff4d4d    |

