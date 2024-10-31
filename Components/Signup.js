import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
// import { auth } from '../Firebase/firebaseSetup'
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Signup" onPress={() => {}} />
      <Button
        title="Already Registered? Login" 
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  
  label: {
    fontSize: 20,
    padding: 10,
  },

  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
})