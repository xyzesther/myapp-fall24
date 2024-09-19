import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';
import { useState } from 'react';

export default function App() {
  const appName = 'My First React Native App';
  const [receivedData, setReceivedData] = useState('');
  const [visibility, setVisibility] = useState(false);

  function handleInputData(data) {
    console.log("App ", data);
    setReceivedData(data);
    setVisibility(false);
  }

  return (
    <View style={styles.container}>
      <Header name={appName} />
      <StatusBar style="auto" />
      <Button 
        title="Add a Goal" 
        onPress={() => setVisibility(true)} 
      />
      <Input 
        textInputFocus={true} 
        inputHandler={handleInputData} 
        modalVisible={visibility}
      />
      <Text style={styles.text}>
        {receivedData}
      </Text>
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

  text: {
    color: "purple",
  },
});
