import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { database } from './firebaseSetup';

export async function writeToDB(data, collectionName) {
  try {
    const docRef = addDoc(collection(database, collectionName), data);
    return docRef;
  } catch (error) {
    console.log("Error writing to DB: ", error);
  }
};

export function deleteFromDB(collectionName, id) {
  try {
    deleteDoc(doc(database, collectionName, id));
  } catch (error) {
    console.log("Error deleting from DB: ", error);
  }
}