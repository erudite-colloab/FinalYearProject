import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Paystack } from 'react-native-paystack-webview';
import { useRoute } from '@react-navigation/native';

const PaymentScreen = ({ route, navigation }) => {
  const { amount, email, tripDetails } = route.params;
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const onSuccess = (response) => {
    console.log('Payment Success:', response);
    setPaymentSuccess(true);
    navigation.navigate('SuccessScreen'); // Navigate to success screen
  };

  const onCancel = () => {
    console.log('Payment Cancelled');
    navigation.navigate('CancelScreen'); // Navigate to cancellation screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.info}>Trip Details: {tripDetails.from} to {tripDetails.to}</Text>
      <Text style={styles.info}>Amount: ₵{amount}</Text>
      <Text style={styles.info}>Email: {email}</Text>

      <Paystack
        paystackKey="YOUR_PAYSTACK_PUBLIC_KEY"
        amount={amount * 100} // Paystack expects amount in kobo
        billingEmail={email}
        activityIndicatorColor="green"
        onSuccess={onSuccess}
        onCancel={onCancel}
        autoStart={false}
      />

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => this.paystackWebView.startTransaction()}
      >
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: '#1E60ED',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
