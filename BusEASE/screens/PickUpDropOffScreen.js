import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { BottomSheet } from 'react-native-elements';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

const PickupDropoffScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('pickup');
  const [pickupPoint, setPickupPoint] = useState('');
  const [dropoffPoint, setDropoffPoint] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [from, setFrom] = useState('Kumasi, Asafo');
  const [to, setTo] = useState('Accra, Circle');

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>

      <TouchableOpacity style={styles.goBack} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.tripCard}>
            <View style={styles.row}>              
              <FontAwesome name="bus" size={24} color="grey" style={styles.busIcon} />
              <View style={styles.dashedLine}></View>               
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
              <FontAwesome name="bus" size={24} color="grey" style={styles.busIcon} />
              <View style={styles.column}>
                <Text style={styles.label}>To</Text>
                <TextInput 
                  style={[styles.input, styles.bottomInput]} 
                  placeholder='Kumasi'
                  value={to}
                  onChangeText={setTo}
                />
              </View>
            </View>
          </View>

      <BottomSheet
        isVisible={isVisible}
        containerStyle={styles.bottomSheetContainer}
      >
        <View style={styles.bottomSheet}>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'pickup' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('pickup')}
            >
              <Text style={[
                styles.tabText,
                selectedTab === 'pickup' && styles.activeTabText,
              ]}>Pick-up Point</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'dropoff' && styles.activeTab,
              ]}
              onPress={() => setSelectedTab('dropoff')}
            >
              <Text style={[
                styles.tabText,
                selectedTab === 'dropoff' && styles.activeTabText,
              ]}>Drop-off Point</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome name="map-marker" size={24} color="grey" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder={selectedTab === 'pickup' ? "Pick-up point" : "Drop-off Point"}
              value={selectedTab === 'pickup' ? pickupPoint : dropoffPoint}
              onChangeText={selectedTab === 'pickup' ? setPickupPoint : setDropoffPoint}
            />
          </View>
          <TouchableOpacity style={styles.continueButton} onPress={() => {/* Navigate to next screen or perform action */}}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  goBack: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
    elevation: 2,
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
      marginTop: 70,
      // marginBottom: 5,
       height: 158,
      // padding: 20
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
    busIcon: {
      marginRight: 10
    },
    bottomInput: {
      marginBottom: 5,
    },
    dashedLine: {
      width: 1,
      height: 30,
      borderWidth: 1,
      borderColor: 'grey',
      borderStyle: 'dashed',
      marginVertical: 5,
    },
    label: {
      fontSize: 14,
      color: '#545455',
      marginBottom: 2,
    },
    input: {
      fontSize: 16,
      fontWeight: 'bold',
      padding: 5,
      //borderBottomWidth: 1,
      borderBottomColor: 'gray',
  
    },
    topInput: {
      borderBottomWidth: 1,
    },
    swapIcon: {
      marginLeft: 10,
      top: 30,
    },
  
  bottomSheetContainer: {
    backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  activeTab: {
    backgroundColor: '#1E60ED',
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#f7f7f7',
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    height: 45
  },
  continueButton: {
    backgroundColor: '#1E60ED',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PickupDropoffScreen;
