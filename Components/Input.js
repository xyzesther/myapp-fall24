import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function Input() {
  const [text, setText] = useState('');
  
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
      />
    </View>
  )
}

const styles = StyleSheet.create({})