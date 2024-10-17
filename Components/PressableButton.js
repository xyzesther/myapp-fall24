import { StyleSheet, View, Pressable } from 'react-native'
import React from 'react'

export default function PressableButton({ pressedFunction, componentStyle, pressedStyle, children }) {
  return (
    <Pressable
      onPress={() => {
        pressedFunction();
      }}
      style={({ pressed }) => { 
        return [
          styles.defaultStyle,  
          componentStyle,
          pressed && styles.defaultPressedStyle,
          pressed && pressedStyle,
        ];
      }}
    >
      <View>
        {children}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  defaultStyle: {
    backgroundColor: "beige",
  },

  defaultPressedStyle: {
    backgroundColor: "lightblue",
    opacity: 0.2,
  }
})