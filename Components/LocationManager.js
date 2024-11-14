import { Alert, Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
// import { getCurrentPositionAsync } from "expo-location";
import * as Location from "expo-location";

export default function LocationManager() {
  const [location, setLocation] = useState(null);
  const [response, requestPermission] = Location.useForegroundPermissions();
  async function verifyPermission() {
    //check if user has granted permission return true
    try {
      if (response.granted) {
        return true;
      }
      const permissionResponse = await requestPermission();
      //else ask for permission
      //return the granted property of the response
      return permissionResponse.granted;
    } catch (err) {
      console.log("verify permission ", err);
    }
  }
  async function locateUserHandler() {
    try {
      // call verifyPermission and only proceed if you have permission
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("YOu need to give location permission");
        return;
      }
      const locationResponse = await Location.getCurrentPositionAsync();
      console.log(locationResponse);
      setLocation({
        latitude: locationResponse.coords.latitude,
        longitude: locationResponse.coords.longitude,
      });
    } catch (err) {
      console.log("locate user ", err);
    }
  }
  return (
    <View>
      <Button title="Locate Me" onPress={locateUserHandler} />
    </View>
  );
}

const styles = StyleSheet.create({});