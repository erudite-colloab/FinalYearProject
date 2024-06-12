import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { AuthContext } from '../context/AuthContext';


const SettingsScreen = () => {
  const {logout} = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
      <Button title="Go back" onPress={logout} />
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
