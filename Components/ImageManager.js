import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import * as ImagePicker from 'expo-image-picker'

export default function ImageManager() {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  console.log(response);
  async function verifyPermission() {
    try {
      if (response.granted) {
        return true;
      } 
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } catch (error) {
      console.log("Verify permission: ", error);
    }
  }
  async function takeImageHandler() {
    try {
      // call verify permission and only proceed to open camera if you have permission
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        Alert.alert("You need to grant camera permission to use this feature");
        return;
      }
      
      const result = ImagePicker.launchCameraAsync({
        allowsEditing: true,
      })
      console.log(result);
    } catch (error) {
      console.log("Take an image: ", error)
    }
  }
  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler}/>
      
    </View>
  )
}

const styles = StyleSheet.create({})