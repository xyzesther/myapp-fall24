import { Pressable, StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function GoalItem({ goalObj, handleDelete, onPressIn, onPressOut }) {
  const navigation = useNavigation();
  
  return (
      <View style={styles.textContainer}>
        <Pressable
          android_ripple={{ color: "white" }}
          style={({ pressed }) => { 
            return [styles.horizontalContainer, pressed && styles.pressedStyle]
          }}
          onPress={() => {
            navigation.navigate("Details", { goalObj: goalObj });
          }}
          onLongPress={() => {
            Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "Delete",
                onPress: () => handleDelete(goalObj.id),
              },
            ]);
          }}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
        <Text style={styles.text}>
          {goalObj.text}
        </Text>
        <PressableButton 
          pressedFunction={() => {
            handleDelete(goalObj.id);
          }}
          componentStyle={styles.deleteContainer}
          pressedStyle={styles.pressedStyle}
        >
          <MaterialIcons name="delete" size={24} color="black" />
        </PressableButton>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
  },

  text: {
    color: "purple",
    fontSize: 25,
    padding: 5,
  },

  pressedStyle: {
    backgroundColor: "red",
  },

  deleteButton: {
    fontSize: 20,
    color: "black",
  },

  deleteContainer: {
    backgroundColor: "lightgrey",
    borderRadius: 5,
    padding: 5,
  },
})