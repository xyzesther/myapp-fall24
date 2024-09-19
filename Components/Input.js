import { StyleSheet, TextInput, View, Text, Button, Modal } from 'react-native'
import React, { useState } from 'react'

export default function Input({textInputFocus, inputHandler, modalVisible}) {
  const [text, setText] = useState('');
  const [showCount, setShowCount] = useState(true);
  const [message, setMessage] = useState('')

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
    console.log(text);
    inputHandler(text);
  }

  const handleVisible = () => {
    
  }
  
  return (
    <Modal animationType='slide' visible={modalVisible}>
      <View style={styles.container}>
        <TextInput 
          placeholder='Type Something Here!' 
          keyboardType='default' 
          style={{ borderBottomColor: 'purple', borderBottomWidth: 2 }}
          value={text}
          onChangeText={function (changedText) {
            setText(changedText)
          }}
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
        <Button 
          title='Confirm' 
          onPress={handleConfirm} 
        />
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
})