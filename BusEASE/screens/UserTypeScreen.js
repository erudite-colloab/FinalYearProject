import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

const UserTypeScreen = ({ navigation }) => {
  const [selectedUserType, setSelectedUserType] = useState(null);

  const handleUserTypeSelect = (type) => {
    setSelectedUserType(type);
  };

  const handleContinue = () => {
    if (selectedUserType) {
      //Alert.alert(`You selected ${selectedUserType}`);
      // Navigate to the next screen based on the selected user type
      navigation.navigate('LoginScreen')
      // Example: navigation.navigate('NextScreen', { userType: selectedUserType });
    } else {
      Alert.alert('Please select a user type.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BusEASE</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.subtitle}>Select user type</Text>
        <TouchableOpacity
          style={[
            styles.optionContainer,
            selectedUserType === 'Vendor' && styles.selectedOption,
          ]}
          onPress={() => handleUserTypeSelect('Vendor')}
        >
          <Text style={styles.optionText}>For Vendors</Text>
          <Image source={require('../assets/admin.jpg')} style={styles.optionImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionContainer,
            selectedUserType === 'Customer' && styles.selectedOption,
          ]}
          onPress={() => handleUserTypeSelect('Customer')}
        >
          <Text style={styles.optionText}>For Customer</Text>
          <Image source={require('../assets/user.jpg')} style={styles.optionImage} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flex: 0.3,
    backgroundColor: '#1E60ED',
    paddingTop: 60,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginTop: 0,
    marginBottom: 50,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '90%',
  },
  selectedOption: {
    backgroundColor: '#1E60ED',
  },
  optionText: {
    fontSize: 18,
    color: 'black',
    flex: 1,
  },
  optionImage: {
    width: 60,
    height: 60,
  },
  continueButton: {
    backgroundColor: '#1E60ED',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserTypeScreen;
