import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const tripsCollection = collection(db, "trips");

/**
 * Save a trip to Firestore
 * @param {Object} tripData - trip information (destination, days, budget, etc.)
 * @param {string|null} userEmail - email of logged-in user (if available)
 * @returns {Promise<string>} - created document id
 */
export async function saveTripToDB(tripData, userEmail = null) {
  const payload = {
    ...tripData,
    userEmail: userEmail || null,
    createdAt: new Date().toISOString(),
  };

  const docRef = await addDoc(tripsCollection, payload);
  return docRef.id; // Firestore document ID
}

/**
 * Get all trips for a specific user (or all trips if no userEmail passed)
 * @param {string|null} userEmail
 * @returns {Promise<Array>}
 */
export async function getTripsForUser(userEmail = null) {
  let q;

  if (userEmail) {
    q = query(
      tripsCollection,
      where("userEmail", "==", userEmail),
      orderBy("createdAt", "desc")
    );
  } else {
    // fallback: get all trips ordered by createdAt
    q = query(tripsCollection, orderBy("createdAt", "desc"));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  }));
}

/**
 * Get a single trip by its Firestore document ID
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
