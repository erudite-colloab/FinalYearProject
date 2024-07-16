import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const PassengerDetailsScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext); // Get the authenticated user from context
  const [email, setEmail] = useState(user ? user.email : '');
  const [passengers, setPassengers] = useState({
    adults: [{ firstName: '', lastName: '' }],
    children: [{ firstName: '', lastName: '' }],
  });

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        
        <Text style={styles.stepText}>Step 4 of 5</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1 Passenger Details</Text>
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

        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>2 Seat Reservation</Text>
          <TouchableOpacity style={styles.selectSeatButton}>
            <Text style={styles.selectSeatText}>Select your seat</Text>
            <Ionicons name="chevron-forward" size={24} color="gray" />
          </TouchableOpacity>
        </View> */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3 Extras</Text>
          <View style={styles.extrasContainer}>
            <Text style={styles.extraText}>
              Included per person:
            </Text>
            <Text style={styles.extraText}>
              1 hand luggage | 7kg, 42×30×18 cm
            </Text>
            <Text style={styles.extraText}>
              1 luggage | 20kg, 80×50×30 cm
            </Text>
            <TextInput
              style={styles.extraInput}
              placeholder="Add extra notes..."
              multiline
            />
          </View>
        </View>

        <Button
          title="Continue"
          buttonStyle={styles.continueButton}
          containerStyle={styles.continueButtonContainer}
          onPress={() => {/* Handle continue action */}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E60ED',
    padding: 20,
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
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
    marginTop: 4,
    marginBottom: 10,
    backgroundColor: 'white',
    marginHorizontal:10,
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
    //marginBottom: 10,
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
    padding: 3,
    //left: 3,
    fontWeight: '300',
    position: 'absolute',
    top: -12,
    left: 10,
    backgroundColor: 'white',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  selectSeatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  selectSeatText: {
    fontSize: 16,
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
});

export default PassengerDetailsScreen;
