import { StyleSheet, TextInput, View, Text } from 'react-native'
import React, { useState } from 'react'

export default function Input(props) {
  const [text, setText] = useState('');
  const [showCount, setShowCount] = useState(true);

  const handleBlur = () => {
    setShowCount(false);
  }

  const handleFocus = () => {
    setShowCount(true);
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