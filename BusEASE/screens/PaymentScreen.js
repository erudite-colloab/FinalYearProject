import React from 'react';
import  { Paystack }  from 'react-native-paystack-webview';
import { View } from 'react-native';

const PaymentScreen = ({ navigation}) => {
  return (
    <View style={{ flex: 1 }}>
      <Paystack  
        paystackKey="sk_test_80a6025f1f6717f0235c2d92018f5f27f0985459"
        amount={'25000.00'}
        billingEmail="eugenebaahasamoah@gmail.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
          // handle response here
        }}
        onSuccess={(res) => {
          // handle response here
        }}
        autoStart={true}
      />
    </View>
  );
}

export default PaymentScreen;