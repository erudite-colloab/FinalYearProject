import { View, 
        Text, 
        StyleSheet ,
        TextInput, 
      } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
 




export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);  

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}> 
        <Text style={styles.text_header}>be.</Text>  
      </View>
      <Animatable.View 
        style={styles.footer}
        animation= 'fadeInUpBig'
      >
        <Text style={styles.text_footerh} >Login Account</Text>
        <Text style={styles.text_footerP}>Hello, welcome back to your account.</Text>

      <Text style={styles.text_email}>Email/Phone number</Text>
        <View style={styles.action}>
          <TextInput 
            style={styles.textInput}
            placeholder='Enter your email or phone number'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <Text style={styles.text_email}>Password</Text>
          <View style={styles.action}>
            <TextInput 
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              placeholder='Enter your password'
              autoCapitalize='none'
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
              <Feather
                name={ isPasswordVisible ? 'eye' : 'eye-off'}
                color={'black'}
                size={24}
              />
            </TouchableOpacity>  
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.accountContainer}>
            <Text style={styles.account_text}>Not registered yet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} >
              <Animatable.Text  style={styles.createAccountText}>Create an Account</Animatable.Text> 
            </TouchableOpacity>
          </View> 
      </Animatable.View>
      
    </View>
  );
};


 const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: 'white',
    
  },
  header: {
    flex: 1,
    backgroundColor: '#1e60ed',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,

  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal:20,

  },
  text_header: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    paddingLeft: 30,

  },
  text_footerh: {
    color: 'Black',
    fontWeight: 'bold',
    fontSize: 24,

  },
  text_footerP: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
    marginBottom: 20,
  },
  text_email: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    
  },
  textInput: {
    flex: 1,
    padding: 10,
    
  },

  icon: {
    padding: 10,
  },

  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#1E60ED',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginBtn: {
    backgroundColor: '#1E60ED',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  account_text: {
    color: 'grey',
    marginLeft: 5,
    padding: 5,
  },

  createAccountText: {
    color: 'black',
    fontWeight: 'bold',
  },



 })