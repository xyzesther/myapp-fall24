import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';

export default function App() {
  const appName = 'My First React Native App';
  const [receivedData, setReceivedData] = useState('');

  const handleInputData = (data) => {
    console.log("App ", data);
    setReceivedData(data);
  }

  return (
    <View style={styles.container}>
      <Header name={appName} />
      <StatusBar style="auto" />
      <Input textInputFocus={true} inputHandler={handleInputData}/>
      <Text>{receivedData}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
