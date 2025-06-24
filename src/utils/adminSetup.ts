import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const createAdminUser = async (email: string, password: string, displayName: string = 'Admin') => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile with display name
    await updateProfile(user, { displayName });

    // It will create admin document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      username: displayName.toLowerCase(),
      displayName,
      photoURL: '',
      role: 'admin',
      createdAt: new Date().toISOString()
    });

    console.log('Admin user created successfully:', user.uid);
    return { success: true, uid: user.uid };
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    return { success: false, error: error.message };
  }
};