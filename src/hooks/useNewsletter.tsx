import { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import emailjs from '@emailjs/browser';

const NEWSLETTER_COLLECTION = 'newsletter_subscribers';

export const useNewsletter = () => {
  const [loading, setLoading] = useState(false);

  const subscribeToNewsletter = async (email: string): Promise<boolean> => {
    setLoading(true);
    
    try {
      // Use localStorage as fallback for newsletter subscriptions
      // This avoids Firestore permission issues for anonymous users
      const localSubscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      
      // Check if email already exists locally
      if (localSubscribers.includes(email.toLowerCase())) {
        setLoading(false);
        return true;
      }

      try {
        // Try to save to Firestore first
        const existingQuery = query(
          collection(db, NEWSLETTER_COLLECTION),
          where('email', '==', email.toLowerCase())
        );
        
        const existingDocs = await getDocs(existingQuery);
        
        if (!existingDocs.empty) {
          // Email already subscribed in Firestore
          setLoading(false);
          return true;
        }

        // Add new subscriber to Firestore
        await addDoc(collection(db, NEWSLETTER_COLLECTION), {
          email: email.toLowerCase(),
          subscribedAt: new Date().toISOString(),
          active: true,
          source: 'website'
        });

        console.log('✅ Successfully subscribed to newsletter via Firestore');
      } catch (firestoreError) {
        console.warn('⚠️ Firestore subscription failed, using localStorage fallback:', firestoreError);
        
        // Fallback to localStorage if Firestore fails
        localSubscribers.push(email.toLowerCase());
        localStorage.setItem('newsletter_subscribers', JSON.stringify(localSubscribers));
        
        console.log('✅ Successfully subscribed to newsletter via localStorage');
      }

      setLoading(false);
      return true;
    } catch (error) {
      console.error('❌ Error subscribing to newsletter:', error);
      setLoading(false);
      return false;
    }
  };

  const notifySubscribers = async (postTitle: string, postExcerpt: string, postUrl: string): Promise<boolean> => {
    try {
      // Get EmailJS credentials from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Check if all required credentials are available
      if (!serviceId || !templateId || !publicKey) {
        console.error('❌ EmailJS credentials missing in environment variables');
        console.log('📋 Required env vars check:', { 
          serviceId: !!serviceId, 
          templateId: !!templateId, 
          publicKey: !!publicKey 
        });
        return false;
      }

      console.log('🔑 EmailJS credentials found, initializing...');

      // Initialize EmailJS with public key
      emailjs.init(publicKey);

      let subscribers: string[] = [];

      try {
        // Try to get subscribers from Firestore first
        const subscribersQuery = query(
          collection(db, NEWSLETTER_COLLECTION),
          where('active', '==', true)
        );
        
        const subscribersSnapshot = await getDocs(subscribersQuery);
        subscribers = subscribersSnapshot.docs.map(doc => doc.data().email);
        console.log(`📊 Found ${subscribers.length} subscribers in Firestore`);
      } catch (firestoreError) {
        console.warn('⚠️ Failed to get subscribers from Firestore, using localStorage:', firestoreError);
        
        // Fallback to localStorage
        const localSubscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
        subscribers = localSubscribers;
        console.log(`📊 Found ${subscribers.length} subscribers in localStorage`);
      }

      if (subscribers.length === 0) {
        console.log('📭 No subscribers to notify');
        return true;
      }

      console.log(`📧 Sending newsletter to ${subscribers.length} subscribers...`);

      // Send individual emails to each subscriber using EmailJS
      const emailPromises = subscribers.map(async (subscriberEmail) => {
        try {
          const templateParams = {
            to_email: subscriberEmail,
            from_name: 'WriterSpace',
            post_title: postTitle,
            post_excerpt: postExcerpt,
            post_url: postUrl,
            unsubscribe_url: `${window.location.origin}/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`,
            site_name: 'WriterSpace',
            current_year: new Date().getFullYear().toString()
          };

          console.log(`📤 Sending email to ${subscriberEmail}...`);
          
          const response = await emailjs.send(
            serviceId,
            templateId,
            templateParams
          );

          console.log(`✅ Email sent successfully to ${subscriberEmail}:`, response);
          return { email: subscriberEmail, status: 'sent', response };
        } catch (error: any) {
          console.error(`❌ Error sending email to ${subscriberEmail}:`, error);
          
          // Log more detailed error information
          if (error.status) {
            console.error(`📊 EmailJS Error Status: ${error.status}`);
          }
          if (error.text) {
            console.error(`📝 EmailJS Error Text: ${error.text}`);
          }
          
          return { 
            email: subscriberEmail, 
            status: 'failed', 
            error: error.text || error.message || 'Unknown error',
            status_code: error.status || 'unknown'
          };
        }
      });

      const results = await Promise.allSettled(emailPromises);
      const successful = results.filter(result => 
        result.status === 'fulfilled' && result.value.status === 'sent'
      ).length;

      const failed = results.length - successful;

      console.log(`📊 Newsletter results: ${successful} sent, ${failed} failed out of ${subscribers.length} total`);
      
      // Log failed emails for debugging
      if (failed > 0) {
        const failedEmails = results
          .filter(result => result.status === 'fulfilled' && result.value.status === 'failed')
          .map(result => result.status === 'fulfilled' ? result.value : null)
          .filter(Boolean);
        
        console.error('❌ Failed email details:', failedEmails);
      }
      
      // Try to store notification in Firestore for tracking
      try {
        await addDoc(collection(db, 'newsletter_notifications'), {
          postTitle,
          postExcerpt,
          postUrl,
          subscriberCount: subscribers.length,
          successfulSends: successful,
          failedSends: failed,
          sentAt: new Date().toISOString(),
          status: successful > 0 ? (failed > 0 ? 'partial' : 'sent') : 'failed'
        });
      } catch (trackingError) {
        console.warn('⚠️ Failed to store notification tracking in Firestore:', trackingError);
        
        // Store in localStorage as fallback
        const notifications = JSON.parse(localStorage.getItem('newsletter_notifications') || '[]');
        notifications.push({
          postTitle,
          postExcerpt,
          postUrl,
          subscriberCount: subscribers.length,
          successfulSends: successful,
          failedSends: failed,
          sentAt: new Date().toISOString(),
          status: successful > 0 ? (failed > 0 ? 'partial' : 'sent') : 'failed'
        });
        localStorage.setItem('newsletter_notifications', JSON.stringify(notifications));
      }

      return successful > 0;

    } catch (error: any) {
      console.error('❌ Error sending newsletter notification:', error);
      
      // Store failed notification for retry
      try {
        await addDoc(collection(db, 'newsletter_notifications'), {
          postTitle,
          postExcerpt,
          postUrl,
          sentAt: new Date().toISOString(),
          status: 'failed',
          error: error.message || 'Unknown error'
        });
      } catch (dbError) {
        console.warn('⚠️ Error storing failed notification in Firestore:', dbError);
        
        // Store in localStorage as fallback
        const notifications = JSON.parse(localStorage.getItem('newsletter_notifications') || '[]');
        notifications.push({
          postTitle,
          postExcerpt,
          postUrl,
          sentAt: new Date().toISOString(),
          status: 'failed',
          error: error.message || 'Unknown error'
        });
        localStorage.setItem('newsletter_notifications', JSON.stringify(notifications));
      }

      return false;
    }
  };

  return {
    subscribeToNewsletter,
    notifySubscribers,
    loading
  };
};