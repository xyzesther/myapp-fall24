import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalDetails({ navigation, route }) {
  console.log(route);
  return (
    <View>
      {route.params ? (
        <Text>Details of {route.params.goalObj.text} goal with
          {route.params.goalObj.id}
        </Text>
      ) : (
        <Text>More Details</Text>
      )}
      <Button
        title="More Details"
        onPress={() => {
          navigation.push("Details");
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})