import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TripsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TripsScreen</Text>
    </View>
  )
}

export default TripsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'                
    }
})