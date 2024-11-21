import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from "../Firebase/firebaseSetup";
import LocationManager from './LocationManager';
import NotificationManager from './NotificationManager';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email: {auth.currentUser.email}</Text>
      <Text style={styles.text}>UID: {auth.currentUser.uid}</Text>
      <LocationManager />
      <NotificationManager />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    justifyContent: 'flex-start',
  },

  text: {
    fontSize: 16,
  },
})