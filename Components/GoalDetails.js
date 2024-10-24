import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import PressableButton from './PressableButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { setWarningInDB } from '../Firebase/firestoreHelper';
import GoalUsers from './GoalUsers';

export default function GoalDetails({ navigation, route }) {
  const [warningPressed, setWarningPressed] = useState(false);

  function warningHandler() {
    setWarningPressed(true);
    navigation.setOptions({ title: "Warning!" });
    setWarningInDB('goals', route.params.goalObj.id, { warning: true });
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

  console.log(route);
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
  }

})