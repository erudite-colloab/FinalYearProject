import React, { useState, useRef } from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PaymentScreen = ({ route, navigation}) => {
  const { amount, email, tripDetails } = route.params;
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Paystack  
        paystackKey="pk_test_0b20d0546409e6c1c3cfaf78f300e3c056a77683"
        paystackSecretKey="sk_test_80a6025f1f6717f0235c2d92018f5f27f0985459"
        amount={'25000.00'}
        billingEmail="eugenebaahasamoah@gmail.com"
        billingName='Eugene'
        billingMobile="0090921"
        currency='GHS'
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
          console.log(e)
        }}
        onSuccess={(res) => {
          // handle response here
          
          console.log(res)
          navigation.navigate("BusTicket")
          console.log(navigation.getState());
        }}
        autoStart={true}
      />
    </View>
  );
}

export default PaymentScreen;