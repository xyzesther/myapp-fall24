import { StyleSheet, TextInput, View, Text, Button, Modal, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import lab2_logo from '../assets/lab2_logo.png'

export default function Input({textInputFocus, inputHandler, modalVisible, cancelHandler}) {
  const [text, setText] = useState('');
  const [showCount, setShowCount] = useState(true);
  const [message, setMessage] = useState('');
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const minCharacters = 5;


  const updateText = (changedText) => {
    setText(changedText);
    setIsConfirmEnabled(changedText.length >= minCharacters);
  }

  const handleBlur = () => {
    setShowCount(false);
    if (text.length < 3) {
      setMessage('Please type more than 3 characters');
    } else {
      setMessage('Thank you');
    }
  }

  const handleFocus = () => {
    setShowCount(true);
    setMessage('');
  }

  const handleConfirm = () => {
    inputHandler(text);
    setText('');
    setIsConfirmEnabled(false);
  }

  const cancelConfirm = () => {
    Alert.alert(
      'Cancel',
      'Are you sure to cancel?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            cancelHandler();
            setText('');
          },
        },
        {cancelable: false}
      ]);
  }

  return (
    <Modal animationType='slide' visible={modalVisible} transparent={true}>
      <View style={styles.container}>
        <View style={styles.insideContainer}>
          <Image 
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2617/2617812.png" }}
            // What is the purpose of alt?
            // alt is a text description of the image, which will be read by the screen reader when the user interacts with it.
            alt='this is a logo image from url'
            style={styles.image}
          />
          <Image 
            source={lab2_logo}
            alt='this is another logo image from assets'
            style={styles.image}
          />
          <TextInput 
            placeholder='Type Something Here!' 
            keyboardType='default' 
            style={styles.input}
            value={text}
            onChangeText={updateText}
            autoFocus={textInputFocus}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {showCount && text.length > 0 && (
            <Text style={styles.count}>
              Characters Typed: {text.length}
            </Text>
          )}
          {message && 
            <Text style={styles.message}>
              {message}
            </Text>
          } 
          <View style={styles.buttonContainer}>
            <View style={styles.button}> 
              <Button
                title='Confirm' 
                onPress={handleConfirm}
                disabled={!isConfirmEnabled} 
              />
            </View>
            <View style={styles.button}>
              <Button 
                title='Cancel'
                onPress={cancelConfirm}
              />
            </View>
          </View>
        </View>  
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  insideContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  count: {
    color: 'grey',
    fontSize: 12,
    marginTop: 5
  },

  message: {
    color: 'red',
    fontSize: 12,
    marginTop: 5
  },

  input: {
    borderBottomColor: 'purple',
    borderBottomWidth: 2,
    color: 'blue',
    padding: 5,
    marginTop: 10,
  },

  buttonContainer: {
    width: '30%',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    marginHorizontal: 10,
  },

  image: {
    width: 100,
    height: 100,
  },
});