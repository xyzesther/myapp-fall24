import { Button, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <Button title="Login" onPress={() => {}} />
      <Button
        title="New User? Create an Account" 
        onPress={() => navigation.navigate('Signup')}
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