# Pixel Notes

A modern, fully functional Progressive Web App (PWA) note-taking application optimized for **Google Pixel 10 Pro**.

## Features

- **Create, edit, and delete notes** with a clean Material Design 3 interface
- **Pin important notes** to keep them at the top of your list
- **Search notes** by title or content
- **Masonry grid layout** for an elegant overview of all notes
- **Dark mode support** — automatically follows your system theme
- **Offline-first PWA** — installable on your Pixel 10 Pro home screen, works without internet
- **Edge-to-edge display** — optimized for the Pixel 10 Pro's tall display
- **Persistent storage** — notes are saved to localStorage and survive app restarts

## Tech Stack

- **React 19** with TypeScript
- **Material UI v7** (Material Design 3 components)
- **Service Worker** for offline caching
- **localStorage** for persistent note storage
- **PWA Manifest** for home screen installation

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install & Run

```bash
npm install
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

The optimized build will be in the `build/` folder, ready to deploy.

### Run Tests

```bash
npm test
```

## Installing on Pixel 10 Pro

1. Open Chrome on your Pixel 10 Pro
2. Navigate to the deployed app URL
3. Tap the **"Install"** banner or go to Chrome menu → **"Install app"**
4. The app appears on your home screen and runs in standalone mode

## Project Structure

```
src/
├── components/
│   ├── NoteCard.tsx      # Individual note card with pin indicator
│   ├── NoteEditor.tsx    # Full-screen note editor with pin/delete actions
│   └── NoteList.tsx      # Main list view with search and masonry grid
├── models/
│   └── Note.ts           # Note data model (TypeScript interface)
├── utils/
│   ├── noteStorage.ts    # localStorage CRUD operations + helpers
│   └── noteStorage.test.ts  # Unit tests for storage utilities
├── App.tsx               # Main app with routing and theme
├── App.test.tsx          # Integration tests for the app
└── index.tsx             # Entry point with service worker registration
```
