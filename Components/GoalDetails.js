import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoalDetails( navigation, route ) {
  console.log(route)
  return (
    <View>
      <Text>Details of {route.params.goalObj.text} {route.params.goalObj.id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})