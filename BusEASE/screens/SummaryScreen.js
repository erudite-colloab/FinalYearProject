import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { Button } from 'react-native-elements';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

const SummaryScreen = ({ route, navigation }) => {
  const { passengers, luggage, tripDetails, email } = route.params;
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const sheetRef = useRef(null);

  useEffect(() => {
    sheetRef.current.snapToIndex(0);
  }, []);

  const handleProceedToPayment = () => {
    navigation.navigate('Payment', {
      amount: tripDetails.tripPrice + luggage.additional * luggage.additionalPrice + luggage.special * luggage.specialPrice,
      email,
      tripDetails,
    });
  };

  const totalLuggagePrice = luggage.additional * luggage.additionalPrice + luggage.special * luggage.specialPrice;
  const totalPrice = tripDetails.tripPrice + totalLuggagePrice + 2.50; // Including service fee

  const renderContent = () => (
    <ScrollView style={styles.bottomSheet}>
      <Text style={styles.summaryTitle}>Summary</Text>
      <Text style={styles.passengerInfo}>{passengers.adults.length} adults, {passengers.children.length} child</Text>
      <Text style={styles.date}>{new Date().toDateString()}</Text>
      
      <View style={styles.tripInfo}>
        <Text style={styles.tripDetail}>{tripDetails.departureTime}</Text>
        <Text style={styles.tripLocation}>{tripDetails.from}</Text>
        <Text style={styles.tripDetail}>{tripDetails.arrivalTime}</Text>
        <Text style={styles.tripLocation}>{tripDetails.to}</Text>
      </View>

      <View style={styles.priceInfo}>
        <Text>Service Fee</Text>
        <Text>{totalLuggagePrice.toFixed(2)} GHC</Text>
      </View>

      <View style={styles.priceInfo}>
        <Text>Ticket Price</Text>
        <Text>{tripDetails.tripPrice.toFixed(2)} GHC</Text>
      </View>

      <View style={styles.priceInfo}>
        <Text>Service Fee</Text>
        <Text>2.50 GHC</Text>
      </View>

      <View style={styles.priceInfo}>
        <Text>Total</Text>
        <Text>{totalPrice.toFixed(2)} GHC</Text>
      </View>

      <View style={styles.termsContainer}>
        <Switch
          value={isSwitchOn}
          onValueChange={setIsSwitchOn}
        />
        <Text style={styles.termsText}>I declare to have read the <Text style={styles.link}>Privacy Policy</Text> and I agree to the <Text style={styles.link}>T&C of Booking</Text> and <Text style={styles.link}>T&C of Carriage</Text></Text>
      </View>

      <Button
        title="Proceed to Payment"
        buttonStyle={styles.continueButton}
        containerStyle={styles.continueButtonContainer}
        onPress={handleProceedToPayment}
        disabled={!isSwitchOn}
      />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={['45%', '100%']}
        children={renderContent()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    height: 450,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  passengerInfo: {
    fontSize: 16,
    marginVertical: 5,
  },
  date: {
    fontSize: 16,
    color: 'gray',
  },
  tripInfo: {
    marginVertical: 10,
  },
  tripDetail: {
    fontSize: 16,
  },
  tripLocation: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  termsText: {
    fontSize: 14,
    marginLeft: 10,
  },
  link: {
    color: '#1E60ED',
  },
  continueButton: {
    backgroundColor: '#1E60ED',
    borderRadius: 20,
    height: 50,
  },
  continueButtonContainer: {
    margin: 20,
  },
});

export default SummaryScreen;
