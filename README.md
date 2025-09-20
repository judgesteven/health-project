# Health Gamification App

A React Native web application that integrates with GameLayer API for health gamification features including missions, achievements, leaderboards, and prizes.

## Features

- **Player Management**: Select and manage players from GameLayer API
- **Profile Cards**: Display player stats including points, credits, level, and team
- **Mission System**: Dynamic daily missions with progress tracking
- **Step Tracking**: Real-time step count with "Add Steps" functionality
- **Progress Bars**: Visual progress indicators for mission completion
- **Real-time Updates**: Automatic data refresh after event completion

## Tech Stack

- **React Native Web**: Cross-platform web development
- **TypeScript**: Type-safe development
- **GameLayer API**: Backend gamification services
- **Lucide React Native**: Modern icon library
- **Webpack**: Module bundling and development server

## GameLayer Integration

The app integrates with GameLayer API using the following endpoints:

- `GET /players` - List all players
- `GET /players/{id}` - Get player details
- `GET /missions` - Get player missions
- `GET /players/{player}/missions/{id}` - Get individual mission progress
- `POST /events/{id}/complete` - Complete events (e.g., step tracking)

## Key Features

### Dynamic Daily Mission Detection
The app automatically identifies daily missions using multiple criteria:
- Mission name contains "daily"
- Mission description contains "daily"
- Mission category is "daily"
- Mission has step-related events

### Real-time Data Synchronization
- Player data refreshes after event completion
- Mission progress bars update automatically
- Step count updates from mission data
- Persistent player selection across page refreshes

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run web
```

The app will be available at `http://localhost:3000`

### Build for Production
```bash
npm run web:build
```

## Project Structure

```
src/
├── components/          # React Native components
│   ├── MissionEntry.tsx     # Individual mission display
│   ├── MissionsCard.tsx     # Mission list container
│   ├── ProfileCard.tsx      # Player profile display
│   ├── StepCountCard.tsx    # Step tracking component
│   └── UserSelector.tsx      # Player selection dropdown
├── services/            # API integration
│   └── gameLayerApi.ts     # GameLayer API client
├── types/               # TypeScript type definitions
│   └── index.ts
└── utils/               # Utility functions
    ├── missionUtils.ts     # Mission detection utilities
    └── mockData.ts         # Mock data for development
```

## Deployment

This project is configured for deployment on Vercel with automatic builds from the main branch.

### Vercel Configuration
- Framework: Other
- Build Command: `npm run web:build`
- Output Directory: `dist`
- Install Command: `npm install`

## API Configuration

The app uses the following GameLayer API configuration:
- API URL: `https://api.gamelayer.co/api/v0`
- Account ID: `health-project`
- Authentication: API key in headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.