import { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const NEWSLETTER_COLLECTION = 'newsletter_subscribers';

export const useNewsletter = () => {
  const [loading, setLoading] = useState(false);

  const subscribeToNewsletter = async (email: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      
      const existingQuery = query(
        collection(db, NEWSLETTER_COLLECTION),
        where('email', '==', email.toLowerCase())
      );
      
      const existingDocs = await getDocs(existingQuery);
      
      if (!existingDocs.empty) {
        
        setLoading(false);
        return true;
      }

      
      await addDoc(collection(db, NEWSLETTER_COLLECTION), {
        email: email.toLowerCase(),
        subscribedAt: new Date().toISOString(),
        active: true
      });

      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setLoading(false);
      return false;
    }
  };

  const notifySubscribers = async (postTitle: string, postExcerpt: string, postUrl: string): Promise<boolean> => {
    try {
      
      console.log('Newsletter notification:', {
        title: postTitle,
        excerpt: postExcerpt,
        url: postUrl,
        timestamp: new Date().toISOString()
      });

     
      await addDoc(collection(db, 'newsletter_notifications'), {
        postTitle,
        postExcerpt,
        postUrl,
        sentAt: new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.error('Error sending newsletter notification:', error);
      return false;
    }
  };

  return {
    subscribeToNewsletter,
    notifySubscribers,
    loading
  };
};