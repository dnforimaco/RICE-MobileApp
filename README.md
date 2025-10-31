# R.I.C.E. Mobile App

A comprehensive mobile nutrition and meal planning application built with React, TypeScript, and Vite.

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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure everything works
5. Submit a pull request

## License

This project is private and proprietary.
