// firebaseFunctions.js

import { getFirestore, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from "./firebase";


export const updateEventInFirestore = async (eventID, updatedData) => {
  const eventDocRef = doc(db, "eventos", eventID);
  
  try {
    await updateDoc(eventDocRef, updatedData);
  } catch (error) {
    throw new Error("Error updating event document in Firestore: ", error);
  }
};

