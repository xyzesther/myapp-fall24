import { StyleSheet, TextInput, View, Text, Button, Modal, Alert } from 'react-native'
import React, { useState } from 'react'

export default function Input({textInputFocus, inputHandler, modalVisible, cancelHandler}) {
  const [text, setText] = useState('');
  const [showCount, setShowCount] = useState(true);
  const [message, setMessage] = useState('')

  const updateText = (changedText) => {
    setText(changedText);
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
    <Modal animationType='slide' visible={modalVisible}>
      <View style={styles.container}>
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
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  },

  buttonContainer: {
    width: '30%',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    marginHorizontal: 10,
  }
});