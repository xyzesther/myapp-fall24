import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalItem({ goalObj, handleDelete, handlePress }) {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        {goalObj.text}
      </Text>
      <Button 
        title="x" 
        onPress={() => {
        handleDelete(goalObj.id);
      }} color="grey" 
      />

      <Button 
        title="i" 
        onPress={() => {
        handlePress()
      }} color="grey" 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    color: "purple",
    fontSize: 25,
    padding: 10,
  },
})