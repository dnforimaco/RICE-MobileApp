# R.I.C.E. Mobile App

A comprehensive mobile nutrition and meal planning application built with React, TypeScript, and Vite.

<img width="300" height="536" alt="image" src="https://github.com/user-attachments/assets/f80de64c-bc5f-4c34-862a-9b001065374e" />
<img width="300" height="536" alt="image" src="https://github.com/user-attachments/assets/1d3b6823-9cd6-4933-9cf7-bb18be32d098" />
<img width="300" height="533" alt="image" src="https://github.com/user-attachments/assets/5803e538-7f31-4f26-ae56-ac154c550b4b" />
<img width="300" height="537" alt="image" src="https://github.com/user-attachments/assets/3daf0f48-978a-43d1-a709-67919c0d6e7b" />
<img width="300" height="537" alt="image" src="https://github.com/user-attachments/assets/91c8c2fd-a32c-41b9-b0fb-cf067cdb1331" />
<img width="300" height="538" alt="image" src="https://github.com/user-attachments/assets/0046b55c-b233-432b-b640-2e72a19e5f20" />
<img width="300" height="537" alt="image" src="https://github.com/user-attachments/assets/55e788a6-5a88-4577-a506-a138cf04121d" />

## Features

- **Authentication**: User login and signup functionality
- **Dashboard**: Daily calorie tracking with progress visualization
- **Ingredient Recognition**: AI-powered ingredient identification
- **Recipe Suggestions**: Personalized recipe recommendations based on your goals
- **Grocery List**: Smart shopping list management
- **Pantry Management**: Track your food inventory and expiration dates
- **Meal Planning**: Plan your meals for the week
- **Settings**: Customize your nutrition goals and preferences
- **Notifications**: Stay updated on expiring items and meal suggestions

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives with Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Styling**: Tailwind CSS with custom design system

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd rice-mobile-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   └── figma/          # Custom components
├── contexts/           # React contexts for state management
├── styles/             # Global styles and CSS
└── main.tsx           # Application entry point
```

## Key Components

- **AuthContext**: Manages user authentication state
- **AppContext**: Handles app-wide state and notifications
- **MobileLayout**: Responsive mobile-first layout
- **HomePage**: Main dashboard with calorie tracking
- **IngredientRecognitionPage**: Camera-based ingredient scanning
- **RecipeSuggestionsPage**: Recipe discovery and recommendations


