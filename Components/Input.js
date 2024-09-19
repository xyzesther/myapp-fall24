import { StyleSheet, TextInput, View, Text } from 'react-native'
import React, { useState } from 'react'

export default function Input(props) {
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
  
  return (
    <View>
      <TextInput 
        placeholder='Type Something Here!' 
        keyboardType='default' 
        style={{ borderBottomColor: 'purple', borderBottomWidth: 2 }}
        value={text}
        onChangeText={function (changedText) {
          setText(changedText)
        }}
        autoFocus={props.autoFocus}
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
    </View>
  )
}

const styles = StyleSheet.create({
  count: {
    color: 'grey',
    fontSize: 12,
    marginTop: 5
  },

  message: {
    color: 'red',
    fontSize: 12,
    marginTop: 5
  }
})