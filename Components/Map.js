import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from "react-native-maps";

export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);

  function confirmCoordinateHandler(){
    // navigate to the profile screen
    // and pass selectedCoordinate
    navigation.navigate('Profile', { selectedLocation });
  }  
  return (
    <>
    <MapView
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421, 
      }}
      style={styles.map}
      onPress={(e)=>{
        console.log(e.nativeEvent.coordinate);
        setSelectedLocation({
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
        });
      }}
    >
      {selectedLocation && <Marker coordinate={selectedLocation} />}
    </MapView>
    <Button 
      disabled={!selectedLocation}
      title="Confirm Selected Coordinate" 
      onPress={confirmCoordinateHandler} 
    />
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
})