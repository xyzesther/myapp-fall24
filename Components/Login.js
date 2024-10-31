import { Button, StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseSetup';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupHandler = () => {
    // go to signup
    navigation.replace("Signup");
  };

  const LoginHandler = async () => {
    // do some validation
    // no empty fields
    // valid email address
    try {
      if (!email || !password) {
        Alert.alert('Please fill in all the fields');
        return;
      }
      // login the user
      const userCred = await signInWithEmailAndPassword(
        auth, 
        email, 
        password
      );
      console.log(userCred.user);
    } catch (error) {
      Alert.alert('Login Error: ', error.code);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(changedText) => {
          setEmail(changedText);
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => {
          setPassword(changedText);
        }}
        secureTextEntry
      />
      <Button 
        title="Login" 
        onPress={LoginHandler} 
      />
      <Button
        title="New User? Create an Account" 
        onPress={signupHandler}
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