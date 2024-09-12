import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import { useState } from 'react';

export default function App() {
  const appName = 'My First React Native App';
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Header name={appName} />
      <StatusBar style="auto" />
      <TextInput 
        placeholder='Type Something Here!' 
        keyboardType='default' 
        style={{ borderBottomColor: 'purple', borderBottomWidth: 2 }}
        value={text}
        onChangeText={function (changedText) {
          setText(changedText)
        }}
      />
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
