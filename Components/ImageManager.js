import { Button, StyleSheet, View, Image } from 'react-native'
import React, {useState} from 'react'
import * as ImagePicker from 'expo-image-picker'

export default function ImageManager({receiveImageUri}) {
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState("");
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
      if (!result.cancelled) {
        setImageUri(result.assets[0].uri);
        // imageUri is still empty string here
        receiveImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Take an image: ", error)
    }
  }
  return (
    <View>
      <Button title="Take an Image" onPress={takeImageHandler}/>
      {imageUri && (
        <Image 
          source={{uri: imageUri}} 
          style={styles.image}
          alt="A preview of the image the user took"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    alignContent: 'center',
  }
})