import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Signup() {
  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

