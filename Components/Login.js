import { Button, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginHandler = async () => {
    // do some validation
    // no empty fields
    // valid email address
    if (!email || !password) {
      Alert.alert('Please fill in all the fields');
      return;
    }
    if (emailRegex.test(email) === false) {
      Alert.alert('Please enter a valid email address');
      return;
    }
    // login the user
    try {
      const userCred = await signInWithEmailAndPassword(
        auth, 
        email, 
        password
      );
      console.log(userCred.user);
    } catch (error) {
      console.log('Login Error: ', error.code);
    }
  }

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
      <Button title="Login" onPress={LoginHandler} />
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