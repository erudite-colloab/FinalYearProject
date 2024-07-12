import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth } from '../firebase/firebaseConfig';
import CustomSwitchButton from '../component/CustomSwitchButton';
import { AuthContext } from '../context/AuthContext';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
  const [from, setFrom] = useState('Kumasi, Asafo');
  const [to, setTo] = useState('Accra, Circle');
  const [departureDate, setDepartureDate] = useState(new Date('2024-07-04'));
  const [returnDate, setReturnDate] = useState(new Date('2024-07-04'));
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState(1);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  const handleSwitchChange = (value) => {
    setTripType(value);
  };

  const onDepartureDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || departureDate;
    //setShowDeparturePicker(Platform.OS === 'ios');
    setShowDeparturePicker(false);
    setDepartureDate(currentDate);
  };

  const onReturnDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || returnDate;
    //setShowReturnPicker(Platform.OS === 'ios');
    setShowReturnPicker(false);
    setReturnDate(currentDate);
  };

  const { name } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}   >
      <ImageBackground
        source={require('../assets/busbg.jpg')} 
        style={styles.header}
        imageStyle={{ opacity: 0.4 }} 
      >
        <View style={styles.headerContent}>
          <Text style={styles.appName}>be</Text>
          <Ionicons name="notifications" size={35} color="white" style={styles.notificationIcon} />
        </View>
        <Text style={styles.welcome}>Welcome, {auth.currentUser?.email}</Text>
      </ImageBackground>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Where to Today?</Text>
      </View>
      
        <Animatable.View style={styles.footer} animation='fadeInUpBig'>
          <View style={styles.switchContainer}>
            <CustomSwitchButton onSelectSwitch={handleSwitchChange} />
          </View>

          <View style={styles.tripCard}>
            <View style={styles.row}>
              <View style={styles.iconContainer}>
                <FontAwesome name="bus" size={24} color="grey" />
                <View style={styles.dashedLine}></View>
              </View>
              <View style={styles.column}>
                <Text style={styles.label}>From</Text>
                <TextInput 
                  style={[styles.input, styles.topInput]} 
                  placeholder='Your Location'
                  value={from}
                  onChangeText={setFrom}
                />
              </View>
              <Ionicons name="swap-vertical-outline" size={30} color="orange" style={styles.swapIcon} />
            </View>

            <View style={styles.row}>
              <FontAwesome name="bus" size={24} color="grey" />
              <View style={styles.column}>
                <Text style={styles.label}>To</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder='Kumasi'
                  value={to}
                  onChangeText={setTo}
                />
              </View>
            </View>
          </View>

        <View style={styles.dateContainer}>
            <TouchableOpacity style={styles.dateWrapper} onPress={() => setShowDeparturePicker(true)}>
              <Ionicons name="calendar-outline" size={20} color="gray" style={styles.inputIcon} />
              <TextInput 
                style={styles.dateInput} 
                value={departureDate.toDateString()} 
                placeholder="Departure" 
                //editable={false} 
              />
            </TouchableOpacity>
            {tripType === 2 && (
              <TouchableOpacity style={styles.dateWrapper} onPress={() => setShowReturnPicker(true)}>
                <Ionicons name="calendar-outline" size={20} color="gray" style={styles.inputIcon} />
                <TextInput 
                  style={styles.dateInput} 
                  value={returnDate.toDateString()} 
                  placeholder="Return Date" 
                  //editable={false} 
                />
              </TouchableOpacity>
            )}
          </View>

          {showDeparturePicker && (
            <DateTimePicker
              value={departureDate}
              mode="date"
              display="default"
              onChange={onDepartureDateChange}
            />
          )}
          {tripType === 2 && showReturnPicker && (
            <DateTimePicker
              value={returnDate}
              mode="date"
              display="default"
              onChange={onReturnDateChange}
            />
          )}

          <View style={styles.passengerContainer}>
            <Text style={styles.passengerText}>Passengers</Text>
            <View style={styles.passengerButtons}>
              <TouchableOpacity onPress={() => setPassengers(passengers > 1 ? passengers - 1 : 1)}>
                <Ionicons name="remove-circle-outline" size={30} color="gray" />
              </TouchableOpacity>
              <Text style={styles.passengerCount}>{passengers}</Text>
              <TouchableOpacity onPress={() => setPassengers(passengers + 1)}>
                <Ionicons name="add-circle-outline" size={30} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        
        
        <Button
          title="Search Trip"
          buttonStyle={styles.searchButton}
          containerStyle={styles.searchButtonContainer}
          icon={<Ionicons name="search" size={30} color="white" />}
        />
      </Animatable.View>
      </KeyboardAvoidingView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1e60ed',
    padding: 20,
  },
  headerContent: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appName: {
    fontSize: 70,
    fontWeight: 'bold',
    color: 'white',
  },
  welcome: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  notificationIcon: {
    marginTop: 10,
    marginVertical: 20,
  },
  titleContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',

  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    elevation: 10,
  },
  switchContainer: {
    paddingHorizontal: 20,
    marginBottom: 6,
  },
  tripCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderColor: '#1E60ED',
    borderWidth: 1,
    marginTop: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  column: {
    flex: 1,
    marginHorizontal: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  dashedLine: {
    width: 1,
    height: 20,
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'dashed',
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 2,
  },
  input: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  topInput: {
    borderBottomWidth: 1,
  },
  swapIcon: {
    marginLeft: 10,
    top: 30,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 5,
    alignSelf: 'center',
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    
  },
  dateInput: {
    flex: 1,
    height: 50,
    width: 100,
    fontSize: 16,
  },
  passengerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
    alignSelf: 'center',
  },
  passengerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  passengerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passengerCount: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  searchButton: {
    backgroundColor: '#1E60ED',
    borderRadius: 20,
    height: 50,
  },
  searchButtonContainer: {
    margin: 20,
    width: '100%',
    alignSelf: 'center',

  },
});

export default HomeScreen;
