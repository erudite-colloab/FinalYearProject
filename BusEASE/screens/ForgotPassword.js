import { View, 
         Text, 
         Button, 
         StyleSheet ,
         TouchableOpacity,
         Image, 
         TextInput,
        } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    //Handle send code lgic here 
    console.log('Send Code to:', email);
    //navigate to OPT Verification screen
    navigation.navigate('OTPverification')
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Entypo name="chevron-thin-left" size={24} color="black" style={{alignItems:'center', padding:5}} />
      </TouchableOpacity>
      <Image 
        source={require('../assets/forgotPassword.png')}
        style={styles.Image}
      />
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Don't worry! It occurs. Please enter the email address linked with your account.</Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter your email"
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSendCode}
      >
        <Text style={styles.btnText}>Send Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  
    // Style for the back button
  },
  Image: {
    height: 300,
    width: 300,
    marginBottom: 20,
    
  },

  title : {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom:10,
    textAlign: 'left'

  },
  subtitle : {
    fontSize: 16,
    color : '#545455',
    textAlign: 'left',
    marginBottom: 20,
    fontWeight: '400',

  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlign: 'left',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

