import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../Firebase/firebaseSetup'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signupHandler = async () => {
    // do some validation
    // no empty fields
    // password and confirm password should match
    // valid email address
    if (!email || !password || !confirmPassword) {
      Alert.alert('Please fill in all the fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password and confirm password should match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password should be at least 6 characters');
      return;
    }
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email) === false) {
      Alert.alert('Please enter a valid email address');
      return;
    }
    // create a new user
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password
      );
      console.log(userCred);
    } catch (error) {
      console.log('Signup Error: ', error.code);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(changedText) => setEmail(changedText)}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(changedText) => setPassword(changedText)}
        secureTextEntry
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(changedText) => setConfirmPassword(changedText)}
        secureTextEntry
      />
      <Button title="Signup" onPress={signupHandler} />
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