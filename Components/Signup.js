import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { auth } from '../Firebase/firebaseSetup'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const loginHandler = () => {
    // go to login
    navigation.replace("Login");
  };

  const signupHandler = async () => {
    // do some validation
    // no empty fields
    // password and confirm password should match
    // valid email address
    try {
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
      const userCred = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password
      );
      console.log(userCred);
    } catch (error) {
      console.log('Signup Error: ', error.code);
      // tell user if an error happens
      if (err.code === "auth/weak-password") {
        Alert.alert("Your password should be at least    6 characters");
      }
      Alert.alert(err.message);
    }
  };

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
        secureTextEntry={true}
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(changedText) => {
          setConfirmPassword(changedText);
        }}
        secureTextEntry={true}
      />
      <Button title="Register" onPress={signupHandler} />
      <Button
        title="Already Registered? Login" 
        onPress={loginHandler}
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
    marginLeft: 10,
  },

  input: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    width: '90%',
  },
})