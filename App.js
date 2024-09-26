import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
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

  function handleCancel() {
    setVisibility(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.topView}>
        <Header name={appName} />
        <Button 
          title="Add a Goal" 
          onPress={() => {
            setVisibility(true);
          }} 
        />
      </View>
      <Input 
        textInputFocus={true} 
        inputHandler={handleInputData}
        cancelHandler={handleCancel} 
        modalVisible={visibility}
      />
      <View style={styles.bottomView}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {receivedData}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  textContainer: {
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginTop: 10,
  },

  text: {
    color: "blue",
    fontSize: 25,
    padding: 10,
  },

  topView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  bottomView: {
    flex: 4,
    backgroundColor: "#dcd",
    alignItems: 'center',
  },
});
