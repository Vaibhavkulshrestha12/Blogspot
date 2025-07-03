# WriterSpace 📝

A sophisticated, modern blogging platform built with React and TypeScript, featuring a beautiful dark/light theme system and comprehensive content management capabilities.

## 🖼️ Preview

<div align="center">

<table>
<tr>
<td width="50%">

![WriterSpace Screenshot 1](./assets/screenshots/Screenshot%202025-07-03%20190433.png)

</td>
<td width="50%">

![WriterSpace Screenshot 2](./assets/screenshots/Screenshot%202025-07-01%20175908.png)

</td>
</tr>
<tr>
<td width="50%">

![WriterSpace Screenshot 3](./assets/screenshots/Screenshot%202025-07-03%20190459.png)

</td>
<td width="50%">

![WriterSpace Screenshot 4](./assets/screenshots/Screenshot%202025-07-03%20190514.png)

</td>
</tr>
</table>

</div>

## ✨ Features

### 📚 **Content Management**
- **Rich Text Editor** - Powered by ReactQuill with full formatting capabilities
- **Reading Time Calculation** - Automatic estimation based on content length

### 🔐 **Authentication & Security**
- **Firebase Authentication** - Secure user management
- **Role-based Access** - Admin and user roles with appropriate permissions
- **Protected Routes** - Admin dashboard accessible only to authorized users

### 📊 **Admin Dashboard**
- **Content Statistics** - Overview of published posts, drafts, and categories
- **Post Management** - Create, edit, delete, and manage all content
- **Real-time Updates** - Live synchronization with Firebase

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication)
- **Editor**: ReactQuill
- **Icons**: Lucide React
- **Email**: EmailJS
- **Build Tool**: Vite

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project
- EmailJS account (for newsletter)

### Installation

1. **Clone the repository**
   ```bash
   git clone(https://github.com/Vaibhavkulshrestha12/Writerspace)
   cd writerspace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # EmailJS Configuration (for newsletter)
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Configure security rules

5. **EmailJS Setup** (Optional - for newsletter)
   - Create account at [EmailJS](https://www.emailjs.com)
   - Create email service and template
   - Add credentials to `.env` file

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/          # Admin dashboard components
│   ├── auth/           # Authentication components
│   ├── blog/           # Blog and content components
│   ├── common/         # Shared components
│   └── pages/          # Static pages
├── contexts/           # React contexts (Theme)
├── hooks/              # Custom hooks (Auth, Blog, Newsletter)
├── config/             # Configuration files
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

### Firebase Security Rules
```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Posts collection
    match /posts/{document} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Newsletter subscribers
    match /newsletter_subscribers/{document} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow create: if true; // Allow anonymous newsletter signups
    }
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

Nah, if you want it just take it 





