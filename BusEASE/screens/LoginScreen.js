import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function OnboardingScreen2() {
  return (
    <View style={styles.container}>
      <View 
        style={styles.header}
      >   
      </View>
      <View style={styles.footer}></View>
      <Text>Login</Text>
    </View>
  )
}


 const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: 'white',
    
  },
  header: {
    flex: 1,
    backgroundColor: '#1e60ed',
    justifyContent: 'center',
    alignContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 200,
    paddingHorizontal:30,

  }
 })