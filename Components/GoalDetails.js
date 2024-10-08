import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'

export default function GoalDetails({ navigation, route }) {
  const [warningPressed, setWarningPressed] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: warningPressed ? "Warning!" : (route.params ? route.params.goalObj.text : "More Details"),
      headerRight: () => (
        <Button
          title="Warning"
          onPress={() => {
            setWarningPressed(true);
          }}
        />
      )
    });
  }, [navigation, warningPressed, route.params]);

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
        <Button
          title="More Details"
          onPress={() => {
            navigation.push("Details");
          }}
        />
      </View>
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
})