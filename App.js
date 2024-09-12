import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';
import Input from './Components/Input';

export default function App() {
  const appName = 'My First React Native App';

  return (
    <View style={styles.container}>
      <Header name={appName} />
      <StatusBar style="auto" />
      <Input autoFocus={true}/>
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
