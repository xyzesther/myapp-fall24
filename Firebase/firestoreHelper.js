import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { database } from './firebaseSetup';

export async function writeToDB(data, collectionName) {
  try {
    const docRef = addDoc(collection(database, collectionName), data);
    return docRef;
  } catch (error) {
    console.log("Error writing to DB: ", error);
  }
};

export function deleteFromDB(collectionName, deletedId) {
  try {
    deleteDoc(doc(database, collectionName, deletedId));
  } catch (error) {
    console.log("Error deleting from DB: ", error);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
      deleteFromDB(collectionName, docSnapshot.id);
    });
  } catch (error) {
    console.log("Error deleting all from DB: ", error);
  }
}

export async function setWarningInDB(collectionName, warningGoalId) {
  try {
    const docRef = doc(database, collectionName, warningGoalId);
    await updateDoc(docRef, { warning: true });
  } catch (error) {
    console.log("Error setting warning: ", error);
  }
}