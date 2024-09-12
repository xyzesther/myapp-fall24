import { StyleSheet, TextInput, View, Text } from 'react-native'
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
      {text.length > 0 && (
        <Text style={styles.count}>
          Characters Typed: {text.length}
        </Text>
      )} 
    </View>
  )
}

const styles = StyleSheet.create({
  count: {
    color: 'grey',
    fontSize: 12,
    marginTop: 5
  }
})