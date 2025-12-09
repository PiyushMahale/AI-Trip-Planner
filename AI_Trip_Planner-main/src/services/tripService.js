import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const tripsCollection = collection(db, "trips");

/**
 * @param {Object} tripData 
 * @param {string|null} userEmail 
 * @returns {Promise<string>} 
 */
export async function saveTripToDB(tripData, userEmail = null) {
  const payload = {
    ...tripData,
    userEmail: userEmail ? userEmail.toLowerCase() : null,
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(tripsCollection, payload);
  return docRef.id;
}

/**
 * @param {string|null} userEmail 
 * @returns {Promise<Array>}
 */
export async function getTripsForUser(userEmail = null) {
  if (!userEmail) {
    return [];
  }

  const lowercasedEmail = userEmail.toLowerCase();

  try {
    const q = query(tripsCollection, where("userEmail", "==", lowercasedEmail));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("No matching trips found in Firestore for email:", lowercasedEmail);
      return [];
    }

    const trips = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    trips.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : 0;
      const dateB = b.createdAt ? new Date(b.createdAt) : 0;
      return dateB - dateA;
    });

    return trips;
  } catch (error) {
    console.error("Error fetching user trips from Firestore:", error);
    return [];
  }
}

/**
 * @param {string} tripId
 * @returns {Promise<Object|null>}
 */
export async function getTripById(tripId) {
  const docRef = doc(db, "trips", tripId);
  const snap = await getDoc(docRef);

  if (!snap.exists()) {
    return null;
  }

  return {
    id: snap.id,
    ...snap.data(),
  };
}