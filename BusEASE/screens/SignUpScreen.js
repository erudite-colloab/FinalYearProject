import { View,
         Text, 
         StyleSheet, 
         TextInput,
         TouchableOpacity,
         ScrollView,
         KeyboardAvoidingView,
         Alert,
       } from 'react-native'
import React, {useContext, useState} from 'react'
import * as Animatable from 'react-native-animatable';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

export default function Signup({ navigation }) {
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {isLoading, handleSignUp} = useContext(AuthContext)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  const login = () => {
    navigation.navigate('LoginScreen');
  }

  const handleSignUpWrapper = async () => {
    if (username === '' || phoneNumber === '' || email === '' || password === '') {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    try {
      await handleSignUp(email, password, username, phoneNumber);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('LoginScreen');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={styles.header}>
        <Text style={styles.text_header}>be.</Text>
      </View>
      <Animatable.View style={styles.footer} animation= 'fadeInUpBig'>
        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>Hello, let's hit the road together!</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text}>Name</Text>
          <View style={styles.action}>
            <TextInput 
              style={styles.input}
              placeholder='Enter your name'
              value={username}
              onChangeText={setUsername}
              keyboardType='default'
            />
          </View>

          <Text style={styles.text}>Phone Number</Text>
          <View style={styles.action}>
            <TextInput 
              style={styles.input}
              placeholder='Enter your phone number'
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType='numeric'
            />
          </View>

          <Text style={styles.text}>Email</Text>
          <View style={styles.action}>
            <TextInput 
              style={styles.input}
              placeholder='Enter your email'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>
          <Text style={styles.text}>Password</Text>
          <View style={styles.action}>
            <TextInput 
              style={styles.input}
              placeholder='Enter password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
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

          <TouchableOpacity style={styles.signupBtn} onPress={handleSignUpWrapper}>
           
            <Text style={styles.signupBtnText}>{isLoading? 'Loading...' : 'Sign up'}</Text>
          </TouchableOpacity>
          <View style={styles.accountContainer}>
            <Text style={styles.account_text}>Already have an Account?</Text>
            <TouchableOpacity onPress={login} >
              <Animatable.Text  style={styles.LoginText}>Login</Animatable.Text> 
            </TouchableOpacity>
          </View> 
        </ScrollView>
      </Animatable.View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 0.7,
    backgroundColor: '#1e60ed',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal:20,
  },
  text_header: {
    color: 'white',
    fontSize: 68,
    fontWeight: 'bold',
    paddingLeft: 30,
  },
  title: {
    color: 'Black',
    fontWeight: 'bold',
    fontSize: 24,

  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
    marginBottom: 10,
    fontWeight: '400'
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    marginBottom: 10,
    borderRadius: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#B0B0B0',
  },  
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  signupBtn: {
    backgroundColor: '#1E60ED',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  signupBtnText: {
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
    color: 'black',
    marginLeft: 5,
    padding: 5,
  },
  LoginText: {
    color: '#1E60ED',
    fontWeight: 'bold',
  },


});

