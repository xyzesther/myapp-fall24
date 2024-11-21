import { collection, addDoc, deleteDoc, doc, getDocs, setDoc, getDoc } from 'firebase/firestore';
import { database } from './firebaseSetup';

export async function writeToDB(data, collectionName) {
  try {
    const docRef = addDoc(collection(database, collectionName), data);
    return docRef;
  } catch (error) {
    console.log("Error writing to DB: ", error);
  }
};

export async function deleteFromDB(collectionName, deletedId) {
  try {
    await deleteDoc(doc(database, collectionName, deletedId));
    // we have to also delete all docs in the users subcollection
    deleteAllFromDB(`goals/${deletedId}/users`);
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
    // delete all docs in users subcollection
    // deleteAllFromDB(`${collectionName}/users`);
  } catch (error) {
    console.log("Error deleting all from DB: ", error);
  }
}

// export async function setWarningInDB(collectionName, warningGoalId, data) {
//   try {
//     await setDoc(doc(database, collectionName, warningGoalId), data, { merge: true });
//   } catch (error) {
//     console.log("Error setting warning: ", error);
//   }
// }

export async function updateDB(collectionName, docId, data) {
  try {
    await setDoc(doc(database, collectionName, docId), data, { merge: true });
  } catch (error) {
    console.log("Error updating DB: ", error);
  }
}

export async function readAllDocs(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    let arrayOfDocs = [];
    querySnapshot.forEach((docSnapshot) => {
      arrayOfDocs.push(docSnapshot.data());
    });
    return arrayOfDocs;
  } catch (error) {
    console.log("Error reading all docs: ", error);
  }
}

export async function readOneDoc(collectionName, docId) {
  try {
    const docRef = doc(database, collectionName, docId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      console.log("Document data:", docSnapshot.data());
      return docSnapshot.data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log("Error reading one doc: ", error);
  }
}