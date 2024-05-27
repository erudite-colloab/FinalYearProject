import { StyleSheet, Text, View,Button } from 'react-native'
import React from 'react'
import {auth} from '../firebase/firebaseConfig';


const HomeScreen = ({ navigation }) => {

  const handleBack = () => {
    auth
    .signOut()
    .then(() => {
      navigation.navigate('AuthStack', {
      screen: 'LoginScreen', })
    }).catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
      <Text>Email: {auth.currentUser?.email}</Text>

      <Button title='Go back' onPress={handleBack} />  
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 42,
    fontWeight: 'bold',

  }
});