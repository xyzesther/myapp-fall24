import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function Input(props) {
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
        autoFocus={props.autoFocus}
      />
    </View>
  )
}

const styles = StyleSheet.create({})