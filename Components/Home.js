import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, Alert } from 'react-native';
import Header from './Header';
import Input from './Input';
import { useState, useEffect } from 'react';
import GoalItem from './GoalItem';
import PressableButton from './PressableButton';
import { auth, database, storage } from '../Firebase/firebaseSetup';
import { deleteFromDB, writeToDB, deleteAllFromDB } from '../Firebase/firestoreHelper';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';

export default function Home({ navigation }) {
  const appName = 'My First React Native App';
  const [visibility, setVisibility] = useState(false);
  const [goals, setGoals] = useState([]);
  const collectionName = 'goals';

  useEffect(() => {
    // querySnapshot is a list of documentSnapshots
    const q = query(collection(database, collectionName),where("owner", "==", auth.currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Define an empty array to store the goals
      let arrayOfGoals = [];
      querySnapshot.forEach((docSnapshot) => {
        // populate the goals array with the data from the database
        arrayOfGoals.push({ ...docSnapshot.data(), id: docSnapshot.id });
        console.log(docSnapshot.id);
      });
      // Set the goals array to the goals array
      setGoals(arrayOfGoals);
    },
    
    (error) => {
      console.log("Error reading data: ", error);
      Alert.alert(error.message);
    }
  );
    return () => unsubscribe();
  }, []); 

  async function handleImageData(uri) {
    try {
      let uploadURl = "";
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const imageName = uri.substring(uri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `images/${imageName}`)
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      uploadURl = uploadResult.metadata.fullPath;
      return uploadURl;
    } catch (error) {
      console.log("Error handling image data: ", error);
    }
  }
  // data now is an object with text and imageUri property
  async function handleInputData(data) {
    console.log("App ", data);
    let imageUri = "";
    if (data.imageUri) {
      imageUri = await handleImageData(data.imageUri);
    }
    // declare a new JS object to store the goal
    let newGoal = { text: data.text };
    newGoal = {...newGoal, owner: auth.currentUser.uid};
    if (data.imageUri) {
      newGoal = {...newGoal, imageUri: imageUri};
    }
    // Add the new goal to the database, call writeToDB
    writeToDB(newGoal, collectionName);
    // update the goals array with the new goal
    // setGoals((prevGoals) => {return [...prevGoals, newGoal]});
    setVisibility(false);
  }

  function handleCancel() {
    setVisibility(false);
  }

  function goalDeleteHandler(deletedId) {
    deleteFromDB(collectionName, deletedId);
    // setGoals((prevGoals) => {
    //   return prevGoals.filter((goal) => goal.id !== deletedId);
    // });
  }

  function handleDeleteAllConfirm() {
    Alert.alert(
      'Delete All',
      'Are you sure to delete all goals?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            deleteAllFromDB(collectionName);
          },
        },
        {cancelable: false}
      ]
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <PressableButton 
          pressedFunction={() => {
            setVisibility(true);
          }}
          componentStyle={styles.addGoalButton} 
        >
          <Text style={styles.addGoalButtonText}>Add A Goal</Text>
        </PressableButton>
      </View>
      <Input 
        textInputFocus={true} 
        inputHandler={handleInputData}
        cancelHandler={handleCancel} 
        modalVisible={visibility}
      />
      <View style={styles.bottomView}>
        <FlatList
          ListEmptyComponent={
            <Text style={styles.goalListEmpty}>
              No Goals To Show
            </Text>
          }
          ListHeaderComponent={ goals.length > 0 &&
            <Text style={styles.goalListHeader}>
              My Goal List
            </Text>
          }
          ItemSeparatorComponent={({ highlighted }) => 
            <View style={[
              styles.itemSeparator, 
              highlighted && {backgroundColor: "purple"}
            ]}/>
          }
          ListFooterComponent={ goals.length > 0 &&
            <View style={styles.goalListFooter}>
              <Button 
                title="Delete All" 
                onPress={handleDeleteAllConfirm}
              />
            </View>
          }
          contentContainerStyle={styles.scrollViewContent} 
          data={goals} 
          renderItem={({ item, separators }) => (
            <GoalItem 
              goalObj={item} 
              handleDelete={goalDeleteHandler}
              onPressIn={() => {separators.highlight()}}
              onPressOut={() => {separators.unhighlight()}}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  topView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  bottomView: {
    flex: 4,
    backgroundColor: "#dcd",
  },

  scrollViewContent: {
    alignItems: "center",
  },

  goalListEmpty: {
    color: "grey",
    fontSize: 20,
    padding: 50,
  },

  goalListHeader: {
    color: "purple",
    fontSize: 25,
    padding: 20,
  },

  goalListFooter: {
    fontSize: 12,
    marginTop: 25,
  },

  itemSeparator: {
    height: 2,
    backgroundColor: "grey",
    marginVertical: 10,
  },

  addGoalButton: {
    padding: 10,
    margin: 10,
    backgroundColor: "#dcd",
    borderRadius: 3,
  },

  addGoalButtonText: {
    color: "purple",
    fontSize: 24,
  },
});
