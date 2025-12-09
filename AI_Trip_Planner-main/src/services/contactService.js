import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../firebase/firebase";               

const contactCollection = collection(db, "contactMessages");

/**
 * @param {Object} data
 */  
export async function saveContactMessage(data) { 
  const payload = {                               
    ...data,                                      
    createdAt: new Date().toISOString(),          
  };                                              

  await addDoc(contactCollection, payload);       
}                                                 
