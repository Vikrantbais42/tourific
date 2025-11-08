
import { collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';

/**
 * Logs a new visit to the 'visits' collection in Firestore.
 * @param firestore The Firestore instance.
 */
export async function logVisit(firestore: Firestore) {
  try {
    const visitsCollection = collection(firestore, 'visits');
    await addDoc(visitsCollection, {
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error logging visit:", error);
    // In a production app, you might want to handle this more gracefully,
    // for example by reporting to an error monitoring service.
  }
}
