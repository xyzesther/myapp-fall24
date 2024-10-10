import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function GoalItem({ goalObj, handleDelete, handlePress }) {
  const navigation = useNavigation();
  
  return (
      <View style={styles.textContainer}>
        <Pressable
          style={styles.horizontalContainer}
          onPress={() => {
            navigation.navigate("Details", { goalObj: goalObj });
          }}
        >
        <Text style={styles.text}>
          {goalObj.text}
        </Text>
        <Button 
          title="x" 
          onPress={() => {
            handleDelete(goalObj.id);
          }} color="grey" 
        />
        {/* <Button 
          title="i" 
          onPress={() => {
            navigation.navigate("Details", { goalObj: goalObj });
          }} 
          color="grey" 
        /> */}
      </Pressable>
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

  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    color: "purple",
    fontSize: 25,
    padding: 10,
  },
})