import { StyleSheet, Text, View, Button, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import PressableButton from './PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { updateDB } from '../Firebase/firestoreHelper';
import GoalUsers from './GoalUsers';
import { storage } from "../Firebase/firebaseSetup";
import { ref, getDownloadURL } from 'firebase/storage';

export default function GoalDetails({ navigation, route }) {
  const [warningPressed, setWarningPressed] = useState(false);
  const [downloadImageURL, setDownloadImageURL] = useState("");

  function warningHandler() {
    setWarningPressed(true);
    navigation.setOptions({ title: "Warning!" });
    updateDB('goals', route.params.goalObj.id, { warning: true });
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <PressableButton
            pressedFunction={warningHandler}
            componentStyle={styles.warningButton}
            pressedStyle={styles.warningButton}
          >
            <Ionicons name="warning-outline" size={24} color="yellow" />
          </PressableButton>
        );
      },  
    });
  }, []);

  useEffect(() => {
    async function getImageDownloadURL() {
      try {
        if (route.params && route.params.goalObj.imageUri) {
          const imageRef = ref(storage, route.params.goalObj.imageUri);
          const downloadURL = await getDownloadURL(imageRef);
          console.log("Download URL: ", downloadURL);
          setDownloadImageURL(downloadURL);
        }
      } catch (error) {
        console.log("Error getting image download URL: ", error);
      }
    }
    getImageDownloadURL();
  }, []);

  return (
    <View>
      {route.params ? (
        <Text style={warningPressed ? (styles.warningText) : (styles.text)}>
          Details of {route.params.goalObj.text} goal with {route.params.goalObj.id}
        </Text>
      ) : (
        <Text style={warningPressed ? (styles.warningText) : (styles.text)}>
          More Details
        </Text>
      )}
      <View style={warningPressed ? (styles.warningText) : (styles.text)}>
        <PressableButton
          pressedFunction={() => {
            navigation.push("Details");
          }}
          componentStyle={styles.button}
        >
          <Text style={styles.buttonText}>More Details</Text>
        </PressableButton>
      </View>
      {route.params && <GoalUsers goalId={route.params.goalObj.id} />}
      {downloadImageURL && (
        <Image
          source={{ uri: downloadImageURL }}
          style={styles.image}
          alt="preview of goal image"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 16,
    padding: 10,
    marginTop: 10,
  },
  warningText: {
    color: "red",
    fontSize: 16,
    padding: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "lightblue",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "blue",
    fontSize: 16,
  },
  warningButton: {
    backgroundColor: "transparent",
  },
  image: {
    width: 100,
    height: 100,
  }
})