import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as Notifications from "expo-notifications";

export default function NotificationManager() {
  async function verifyPermission() {
    try {
      const permissionResponse = Notification.getPermissionsAsync();
      if (permissionResponse.granted) {
        return true;
      }
      const requestPermissionResponse = 
        await Notification.requestPermissionsAsync();
      return requestPermissionResponse.granted;
    } catch (error) {
      console.log("Error getting notification permission: ", error);
    }
  }

  async function scheduleNotificationHandler() {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to give notification permission");
      }
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "My first local notification",
          body: "This is the body of the notification",
        },
        trigger: { seconds: 5 },
      });
      console.log("Notification ID: ", id);
    } catch (error) {
      console.log("Error scheduling notification: ", error);
    }
  }
  return (
    <View>
      <Button
        title="Remind me to set a goal"
        onPress={scheduleNotificationHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({})