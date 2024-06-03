import { StyleSheet, Text, View, TouchableOpacity, TextInput, Dimensions,Button, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [destination, setDestination] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

 

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.title}>be.</Text>
              <TouchableOpacity style={styles.bellIcon}>
                <FontAwesome name="bell" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>Welcome {auth.currentUser?.email},</Text>
              <Text style={styles.questionText}>Where to today?</Text>
            </View>
            <View style={styles.detailRow}>
              <TouchableOpacity style={styles.detailButton}>
                <View style={styles.iconWithText}>
                  <FontAwesome name="calendar" size={24} color="black" />
                  <Text style={styles.detailText}>Departure</Text>
                </View>
                <Text style={styles.detailsub}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.detailButton}>
                <View style={styles.iconWithText}>
                  <FontAwesome name="user" size={24} color="black" />
                  <Text style={styles.detailText}>Passengers</Text>
                </View>
                <Text style={styles.detailsub}>2</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.mapContainer}>
            <MapView style={styles.map} initialRegion={location}>
              <Marker coordinate={location} />
              <Marker coordinate={destination} />
              <Polyline coordinates={[location, destination]} strokeColor="#000" strokeWidth={3} />
            </MapView>

            <View style={styles.tripCard}>
              <View style={styles.row}>
                <View style={styles.iconContainer}>
                  <FontAwesome name="bus" size={24} color="grey" />
                  <View style={styles.dashedLine}></View>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>From</Text>
                  <TextInput style={[styles.input,styles.topInput]} placeholder='Your Location'/>
                </View>
                <Ionicons name="swap-vertical-outline" size={30} color="orange" style={styles.swapIcon} />
              </View>

              <View style={styles.row}>
                <FontAwesome name="bus" size={24} color="grey" />
                <View style={styles.column}>
                  <Text style={styles.label}>To</Text>
                  <TextInput style={styles.input} placeholder='Kumasi'/>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.searchBtn}>
              <Text style={styles.searchBtnTxt}>Search for a trip</Text>
            </TouchableOpacity>
          </View>

          
        </View>
      </ScrollView> 
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fff',
  },
  header: {
    backgroundColor: '#1E60ED',
    paddingBottom: 20,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    marginTop: 10,
  },
  bellIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  questionText: {
    fontSize: 16,
    marginTop: 5,
    color: 'white',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  detailButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  detailsub: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 1.5 ,
  },
  tripCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    position: 'absolute',
    top: -10,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    paddingBottom:3,
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
    //borderBottomWidth : 1,
  },
  topInput: {
    borderBottomWidth: 1,
  },
  swapIcon: {
    marginLeft: 10,
    top: 30,
    
  },
  searchBtn: {
    backgroundColor: '#1E60ED',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    marginBottom: 50,
  },
  searchBtnTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});
