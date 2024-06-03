import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TicketsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TicketsScreen</Text>
    </View>
  )
}

export default TicketsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'                
  },
});