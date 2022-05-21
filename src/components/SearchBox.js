import React from "react";
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBox(props) {
  const { value, onChangeText } = props

  return (
    <TextInput
      style={styles.input}
      placeholderTextColor='#a9a9a9'
      placeholder='key word'
      onChangeText={onChangeText}
      value={value}
      underlineColorAndroid="transparent"
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  }  
})