# Pixel 10 App

A fully functional Android app built for the **Google Pixel 10 Pro**, using modern Android development best practices.

## Features

- 📋 **Task Manager** — Add, complete, and delete tasks with a clean Material 3 UI
- ⚙️ **Settings** — Toggle notifications, dark mode, and dynamic color
- 🎨 **Dynamic Color** — Adapts to your wallpaper using Android 12+ Material You
- 🌙 **Dark Mode support**
- 🧭 **Bottom Navigation** with Jetpack Navigation Compose

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Kotlin 2.1 |
| UI | Jetpack Compose + Material 3 |
| Navigation | Navigation Compose |
| Build | Gradle 8.11 with Kotlin DSL |
| Min SDK | 26 (Android 8.0) |
| Target SDK | 35 (Android 15) |

## Building

```bash
./gradlew assembleDebug
```

## Running Tests

```bash
./gradlew test
```

## Project Structure

```
app/src/main/
├── java/com/example/pixel10app/
│   ├── MainActivity.kt          # App entry point & navigation
│   └── ui/
│       ├── screens/
│       │   ├── HomeScreen.kt    # Task list screen
│       │   └── SettingsScreen.kt
│       └── theme/
│           ├── Color.kt
│           ├── Theme.kt
│           └── Type.kt
└── res/
    ├── values/strings.xml
    └── values/themes.xml
```
