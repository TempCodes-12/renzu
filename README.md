# The Legends of Ren Zu — Gospel App

A sacred text reader app for Android, styled like a holy Bible.

## Features
- 📖 All 58 passages with verse-by-verse layout
- ✦ Drop caps, gold ornaments, Garamond serif font
- 🔖 Bookmark any verse (long-press to bookmark)
- 🔍 Full-text search across all scriptures
- 🌑 Dark gospel theme throughout
- 📏 Adjustable font size (tap "Aa" while reading)
- ↗ Share any verse with reference

---

## Build the APK (3 steps)

### Step 1 — Install tools
```bash
npm install -g eas-cli
npm install
```

### Step 2 — Login to Expo (free account)
```bash
eas login
```
Create a free account at https://expo.dev if you don't have one.

### Step 3 — Build the APK
```bash
eas build --platform android --profile preview
```

This uploads to Expo's build servers and emails/shows you a download link for the `.apk` file in ~5–10 minutes. No Android Studio needed.

---

## Run locally (preview in browser or Expo Go app)
```bash
npx expo start
```
Scan the QR code with the **Expo Go** app on your phone.

---

## Project structure
```
App.js                    ← Entry point & navigation
src/
  theme.js                ← Colors, fonts, sizes
  storage.js              ← Bookmarks & settings (AsyncStorage)
  data/
    scripture.json        ← All 58 sections, 2174 verses
  screens/
    ContentsScreen.js     ← Table of contents + search bar
    ReaderScreen.js       ← Main reading view
    BookmarksScreen.js    ← Saved verses
    SearchScreen.js       ← Full-text search
```
"# renzu" 
