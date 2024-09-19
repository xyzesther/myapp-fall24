import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

export default function Header(props) {

  return (
    <View>
      <Text style={styles.textStyle}>Welcome to {props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "purple",
    fontSize: 20,
    borderColor: 'purple',
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
});