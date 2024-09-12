import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

export default function Header(props) {

  return (
    <View>
      <Text>Welcome to {props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});