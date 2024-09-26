import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalItem({ goalObj }) {
  console.log("GoalItem ", goalObj);
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>
        {goalObj.text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginTop: 10,
  },

  text: {
    color: "purple",
    fontSize: 25,
    padding: 10,
  },
})