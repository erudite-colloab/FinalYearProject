import React, { useContext, useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Switch } from 'react-native';
import { Button } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';

const PassengerDetailsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState(user ? user.email : '');
  const [passengers, setPassengers] = useState({
    adults: [{ firstName: '', lastName: '' }],
    children: [{ firstName: '', lastName: '' }],
  });
  const [luggage, setLuggage] = useState({
    additional: 1,
    special: 1,
    additionalPrice: 10.00,
    specialPrice: 30.00,
  });
  const [agree, setAgree] = useState(false);

  const tripDetails = {
    from: 'Kumasi, Asafo',
    to: 'Accra, Circle',
    departureTime: '06:05AM',
    arrivalTime: '12:00PM',
    tripPrice: 120,
  };

  const sheetRef = useRef(null);

  const handlePassengerCountChange = (type, operation) => {
    setPassengers((prevPassengers) => {
      const currentCount = prevPassengers[type].length;
      const newCount = operation === 'increase' ? currentCount + 1 : currentCount - 1;
      const newPassengerArray = Array.from({ length: newCount }, (_, i) => prevPassengers[type][i] || { firstName: '', lastName: '' });
      return {
        ...prevPassengers,
        [type]: newPassengerArray,
      };
    });
  };

  const handlePassengerDetailChange = (type, index, field, value) => {
    setPassengers((prevPassengers) => {
      const updatedPassengers = prevPassengers[type].map((passenger, i) =>
        i === index ? { ...passenger, [field]: value } : passenger
      );
      return {
        ...prevPassengers,
        [type]: updatedPassengers,
      };
    });
  };

  const handleLuggageChange = (type, operation) => {
    setLuggage((prevLuggage) => {
      const newCount = operation === 'increase' ? prevLuggage[type] + 1 : prevLuggage[type] - 1;
      return {
        ...prevLuggage,
        [type]: newCount >= 0 ? newCount : 0,
      };
    });
  };

  const handleContinue = () => {
    sheetRef.current.snapToIndex(0);
  };

  const renderSummaryContent = () => (
    <View style={styles.bottomSheetContent}>
      <Text style={styles.summaryTitle}>Summary</Text>
      <Text>{passengers.adults.length} adults, {passengers.children.length} child</Text>
      <Text style={styles.sectionTitle}>Trip Details</Text>
      <View style={styles.tripDetailRow}>
        <Text>{tripDetails.departureTime}</Text>
        <Text style={styles.tripLocation}>{tripDetails.from}</Text>
      </View>
      <View style={styles.tripDetailRow}>
        <Text>{tripDetails.arrivalTime}</Text>
        <Text style={styles.tripLocation}>{tripDetails.to}</Text>
      </View>
      <View style={styles.tripDetailRow}>
        <Text>Service Fee</Text>
        <Text>₵{(luggage.additional * luggage.additionalPrice + luggage.special * luggage.specialPrice).toFixed(2)}</Text>
      </View>
      <View style={styles.tripDetailRow}>
        <Text>Total</Text>
        <Text>₵{(tripDetails.tripPrice + luggage.additional * luggage.additionalPrice + luggage.special * luggage.specialPrice).toFixed(2)}</Text>
      </View>
      <View style={styles.termsContainer}>
        <Switch value={agree} onValueChange={setAgree} />
        <Text>I declare to have read the Privacy Policy and agree to the T&C of Booking and T&C of Carriage</Text>
      </View>
      <Button
        title="PROCEED TO PAYMENT"
        buttonStyle={styles.continueButton}
        containerStyle={styles.continueButtonContainer}
        disabled={!agree}
        onPress={() => navigation.navigate('Payment', {
          passengers,
          luggage,
          tripDetails,
          email,
        })}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.stepText}>Step 4 of 5</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passenger Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={styles.passengerControlContainer}>
            <Text style={styles.passengerControlLabel}>Adults</Text>
            <View style={styles.passengerControlButtons}>
              <TouchableOpacity
                onPress={() => handlePassengerCountChange('adults', 'decrease')}
                style={styles.passengerControlButton}
                disabled={passengers.adults.length <= 1}
              >
                <Ionicons name="remove-circle-outline" size={24} color="gray" />
              </TouchableOpacity>
              <Text style={styles.passengerCount}>{passengers.adults.length}</Text>
              <TouchableOpacity
                onPress={() => handlePassengerCountChange('adults', 'increase')}
                style={styles.passengerControlButton}
              >
                <Ionicons name="add-circle-outline" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.passengerControlContainer}>
            <Text style={styles.passengerControlLabel}>Children</Text>
            <View style={styles.passengerControlButtons}>
              <TouchableOpacity
                onPress={() => handlePassengerCountChange('children', 'decrease')}
                style={styles.passengerControlButton}
                disabled={passengers.children.length <= 0}
              >
                <Ionicons name="remove-circle-outline" size={24} color="gray" />
              </TouchableOpacity>
              <Text style={styles.passengerCount}>{passengers.children.length}</Text>
              <TouchableOpacity
                onPress={() => handlePassengerCountChange('children', 'increase')}
                style={styles.passengerControlButton}
              >
                <Ionicons name="add-circle-outline" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
          {passengers.adults.map((_, index) => (
            <View key={index} style={styles.passengerContainer}>
              <Text style={styles.passengerType}>Adult</Text>
              <TextInput
                style={styles.input}
                placeholder="First name"
                value={passengers.adults[index].firstName}
                onChangeText={(value) => handlePassengerDetailChange('adults', index, 'firstName', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Last name"
                value={passengers.adults[index].lastName}
                onChangeText={(value) => handlePassengerDetailChange('adults', index, 'lastName', value)}
              />
            </View>
          ))}
          {passengers.children.map((_, index) => (
            <View key={index} style={styles.passengerContainer}>
              <Text style={styles.passengerType}>Child</Text>
              <TextInput
                style={styles.input}
                placeholder="First name"
                value={passengers.children[index].firstName}
                onChangeText={(value) => handlePassengerDetailChange('children', index, 'firstName', value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Last name"
                value={passengers.children[index].lastName}
                onChangeText={(value) => handlePassengerDetailChange('children', index, 'lastName', value)}
              />
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extras</Text>
          <View style={styles.extrasContainer}>
            <Text style={styles.extraText}>Included per person:</Text>
            <Text style={styles.extraText}>1 hand luggage | 7kg, 42×30×18 cm</Text>
            <Text style={styles.extraText}>1 luggage | 20kg, 80×50×30 cm</Text>
            <View style={styles.luggageItem}>
              <MaterialIcons name="luggage" size={40} color="gray" />
              <View style={styles.luggageDetails}>
                <Text style={styles.luggageTitle}>Additional</Text>
                <Text style={styles.luggageDescription}>20kg 80×50×30 cm</Text>
                <Text style={styles.luggagePrice}>+₵{luggage.additionalPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.luggageControlButtons}>
                <TouchableOpacity
                  onPress={() => handleLuggageChange('additional', 'decrease')}
                  style={styles.luggageControlButton}
                >
                  <Ionicons name="remove-circle-outline" size={28} color="gray" />
                </TouchableOpacity>
                <Text style={styles.luggageCount}>{luggage.additional}</Text>
                <TouchableOpacity
                  onPress={() => handleLuggageChange('additional', 'increase')}
                  style={styles.luggageControlButton}
                >
                  <Ionicons name="add-circle-outline" size={28} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.luggageItem}>
              <MaterialCommunityIcons name="medical-bag" size={40} color="gray" />
              <View style={styles.luggageDetails}>
                <Text style={styles.luggageTitle}>Special</Text>
                <Text style={styles.luggageDescription}>30kg 240 cm (x+y+z)</Text>
                <Text style={styles.luggagePrice}>+₵{luggage.specialPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.luggageControlButtons}>
                <TouchableOpacity
                  onPress={() => handleLuggageChange('special', 'decrease')}
                  style={styles.luggageControlButton}
                >
                  <Ionicons name="remove-circle-outline" size={28} color="gray" />
                </TouchableOpacity>
                <Text style={styles.luggageCount}>{luggage.special}</Text>
                <TouchableOpacity
                  onPress={() => handleLuggageChange('special', 'increase')}
                  style={styles.luggageControlButton}
                >
                  <Ionicons name="add-circle-outline" size={28} color="gray" />
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              style={styles.extraInput}
              placeholder="Add special instructions..."
              multiline
            />
          </View>
        </View>
        <Button
          title="Continue"
          buttonStyle={styles.continueButton}
          containerStyle={styles.continueButtonContainer}
          onPress={handleContinue}
        />
      </ScrollView>
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={['50%', '100%']}
        enablePanDownToClose={true}
        backgroundComponent={() => <View style={{ backgroundColor: 'white', flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />}
      >
        {renderSummaryContent()}
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  stepText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },
  passengerControlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  passengerControlLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  passengerControlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerControlButton: {
    paddingHorizontal: 10,
  },
  passengerCount: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  passengerContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  passengerType: {
    fontSize: 14,
    marginBottom: 5,
  },
  extrasContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  extraText: {
    fontSize: 14,
    marginBottom: 5,
  },
  luggageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  luggageDetails: {
    flex: 1,
    marginLeft: 10,
  },
  luggageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  luggageDescription: {
    fontSize: 14,
    color: 'gray',
  },
  luggagePrice: {
    fontSize: 16,
    color: 'green',
    fontWeight: '600'
  },
  luggageControlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  luggageControlButton: {
    paddingHorizontal: 10,
  },
  luggageCount: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  extraInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
  continueButton: {
    backgroundColor: '#1E60ED',
    borderRadius: 20,
    height: 50,
  },
  continueButtonContainer: {
    margin: 20,
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 20,
    height: '100%',
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tripDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  tripLocation: {
    fontWeight: 'bold',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default PassengerDetailsScreen;
