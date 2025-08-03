
# 🎬 YouTube Video App - React Native Skill Assessment

An interactive YouTube-integrated mobile application built using **React Native CLI** with **TypeScript**, featuring user authentication, video interactions, profile management, and a saved videos experience — all designed using a custom **Atomic Design System** and optimized for performance.

---

## 📱 Demo & Downloads

- 📦 **APK Download**: [Download the Latest APK](https://drive.google.com/file/d/1zXR1qx5YIF13INYXDzaC9bxVV3pqcvWl/view?usp=sharing)
- 💻 **GitHub Repository**: [GitHub Repo](https://github.com/IbrahimXplorer/youtube)

---

## 🚀 Features

###  YouTube API Integration
- Fetch and display a scrollable list of YouTube videos.
- Watch videos directly inside the app with a custom player using `react-native-youtube-iframe`.

### 🔐 Authentication
- Firebase Email & Password Authentication.
- Restricted access to liking, commenting, and saving videos without logging in.

###  User Interactions
- **Like** videos: Stored in Firebase Firestore.
- **Comment** on videos: Stored and fetched per user.
- **Save** videos: Persisted using Redux Toolkit + `redux-persist` with MMKV for performance.

###  Saved Videos Page
- View all saved videos with thumbnails.
- Replay videos or remove them from the list.
- Fully synced with Redux-persisted local state.

###  Profile Management
- View and update profile information: Name & Profile Photo.
- Upload image using `react-native-image-picker`.
- Navigate to saved videos directly from Profile.

---

## 🧠 Tech Stack & Tools

| Feature                    | Library/Tool                             |
|---------------------------|------------------------------------------|
| Framework                 | React Native CLI                         |
| Language                  | TypeScript                               |
| State Management          | Redux Toolkit, Redux Persist (MMKV)      |
| UI Architecture           | Custom Atomic Design System              |
| Image Optimization        | `react-native-fast-image`                |
| List Performance          | `@shopify/flash-list`                    |
| Authentication            | Firebase Auth (Email/Password)           |
| Backend / DB              | Firebase Firestore                       |
| Video Playback            | `react-native-youtube-iframe`            |
| Form Handling             | Custom-controlled inputs (atomic design) |
| Storage                   | MMKV + AsyncStorage (fallback)           |

---

##  Screens

- **Home Screen**: Browse YouTube videos.
- **Video Details**: Watch, like, comment, and save.
- **Saved Videos Page**: Manage your saved content.
- **Profile Screen**: Update name and photo.
- **Authentication Screens**: Email/password login and registration.

---

# 🛠️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/youtube-video-app.git
cd youtube-video-app

# 2. Install dependencies
yarn install

# 3. Install pod
yarn pod

# 4. Start the Metro bundler
npx react-native start

# 5. Run on Android
npx react-native run-android

# 6. Run on iOS
npx react-native run-ios
```

---

## ✅ Testing Checklist

- [x] YouTube videos load and play correctly
- [x] Firebase login & registration functional
- [x] Likes & comments stored and displayed per video
- [x] Videos saved and persisted across sessions
- [x] Profile photo upload and update
- [x] Navigation to Saved Videos from Profile

---

## 💡 Highlights & Thought Process

- Applied **Atomic Design Pattern** for reusable components and scalable UI architecture.
- Optimized list performance using **FlashList** and **FastImage** for better UX.
- Leveraged **Redux Toolkit** with **MMKV** to persist saved videos offline.
- Implemented full **TypeScript** type safety for reliability and clarity.
- Designed responsive and accessible UI using custom layout components.
