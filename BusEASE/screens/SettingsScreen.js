import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';
import { auth } from '../firebase/firebaseConfig';

const handleBack = () => {
  auth
    .signOut()
    .then(() => {
      navigation.navigate('AuthStack', {
        screen: 'LoginScreen',
      });
    })
    .catch((error) => alert(error.message));
};

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
      <Button title="Go back" onPress={handleBack} />
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'                
    }
});
