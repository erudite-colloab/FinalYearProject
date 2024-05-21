import {  StyleSheet, 
          Text, 
          View, 
          TextInput,
          TouchableOpacity,
           Image,
        } from 'react-native'
import React, { useEffect, useState } from 'react'

const OTPverification = ( { navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(countdown);
          setIsResendDisabled(false);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    
    return () => clearInterval(countdown);
}, []);

const handleChangeOtp = (index, value) => {
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    // Handle OTP verification logic here
    console.log('OTP entered:', otp.join(''));
    navigation.navigate('NewPassword');
  };

  const handleResend = () => {
    if (!isResendDisabled) {
      // Handle OTP resend logic here
      setTimer(59);
      setIsResendDisabled(true);
      console.log('Resend OTP');
    }
  };



  return (
    <View style={styles.container}>
      <Image 
        style={styles.image} 
        source={require('../assets/Enter OTP-bro.png')}
      />  
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Please enter the OTP (One-Time Password) sent to your registered email to complete your verification.
      </Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
            <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={value => handleChangeOtp(index, value)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>
      <Text style={styles.timer}>
        Remaining time: <Text style={styles.timerCount}>00:{timer < 10 ? `0${timer}` : timer}s</Text>
      </Text>
      <TouchableOpacity onPress={handleResend} disabled={isResendDisabled}>
        <Text style={[styles.resend, isResendDisabled && styles.resendDisabled]}>Didn't get the code? Resend</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
        <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        height: 200,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
      },
    otpContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 18,
      },
      timer: {
        fontSize: 16,
        marginBottom: 10,
      },
      timerCount: {
        color: '#007BFF',
      },
      resend: {
        fontSize: 16,
        color: '#007BFF',
        marginBottom: 20,
      },
      resendDisabled: {
        color: '#aaa',
      },
      button: {
        width: '80%',
        height: 50,
        backgroundColor: '#007BFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      cancelButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007BFF',
      },
      cancelButtonText: {
        color: '#007BFF',
      },
});







export default OTPverification