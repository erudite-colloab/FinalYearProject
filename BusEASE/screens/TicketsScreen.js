import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const trips = [
  {
    id: '1',
    from: 'Kumasi, Asafo',
    to: 'Accra, Circle',
    departureTime: '06:05AM',
    duration: '5 hrs',
    arrivalTime: '12:00PM',
    seatsAvailable: 5,
    price: 120,
    currency: 'GHC',
    company: 'STC',
    //companyLogo: require('../assets/bus.png'), // replace with actual image paths
  },
  {
    id: '2',
    from: 'Kumasi, Asafo',
    to: 'Accra, Circle',
    departureTime: '06:05AM',
    duration: '45 min',
    arrivalTime: '5:30 PM',
    seatsAvailable: 8,
    price: 100,
    currency: 'GHC',
    company: 'VVIP',
    //companyLogo: require('../assets/uberbus.png'), // replace with actual image paths
  },
  {
    id: '3',
    from: 'Kumasi, Asafo',
    to: 'Accra, Circle',
    departureTime: '6:00 PM',
    duration: '5 hr',
    arrivalTime: '3:45 PM',
    seatsAvailable: 10,
    price: 65,
    currency: 'GHC',
    company: '2M Express',
    //companyLogo: require('../assets/swvl.png'), // replace with actual image paths
  },
  {
    id: '4',
    from: 'Kumasi, Asafo',
    to: 'Accra, Circle',
    departureTime: '5:10 AM',
    duration: '5hr',
    arrivalTime: '5:00 PM',
    seatsAvailable: 3,
    price: 70,
    currency: 'GHC',
    company: 'OA',
    //companyLogo: require('../assets/bus.png'), // replace with actual image paths
  },
];

const TripResultsScreen = ({ navigation }) => {
  const renderTrip = ({ item }) => (
    <View style={styles.tripCard}>
      <View style={styles.tripHeader}>
        <View style={styles.tripInfo}>
          <Text style={styles.tripRoute}>{item.from} - {item.to}</Text>
          <Text style={styles.tripDuration}>Duration: {item.duration}</Text>
        </View>
        <View style={styles.tripTimeInfo}>
          <Text style={styles.tripTime}>{item.departureTime}</Text>
          <Text style={styles.tripArrivalTime}>{item.arrivalTime}</Text>
        </View>
      </View>
      <View style={styles.tripDetails}>
        <View style={styles.companyInfo}>
          <Image source={item.companyLogo} style={styles.companyLogo} />
          <Text style={styles.companyName}>{item.company}</Text>
        </View>
        <Text style={styles.price}>{item.price} {item.currency}</Text>
        <TouchableOpacity 
          style={styles.buyButton} 
          //</View>onPress={() => Alert.alert('Buy Ticket', `Buy ticket for ${item.company}`)} && navigation.navigate("SelectSeatScreen")  >
          onPress={() => {
            Alert.alert('Buy Ticket', `Buy ticket for ${item.company}`, [
              { text: "OK", onPress: () => navigation.navigate("SelectSeat") },
              { text: "Cancel", onPress: () => {} }, // Optional: Add a  button
            ]);cancel
          }} >
          <Text style={styles.buyButtonText}>Buy Ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select your trip</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.destinationInfo}>
        <Text style={styles.destinationText}>Destination</Text>
        <Text style={styles.destinationRoute}>Kumasi, Asafo - Accra, Circle</Text>
        <Text style={styles.durationText}>45 min</Text>
      </View>
      <FlatList
        data={trips}
        renderItem={renderTrip}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.tripList}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="home-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="ticket-outline" size={24} color="purple" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="person-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TripResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#1E60ED',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterButton: {
    marginLeft: 20,
  },
  destinationInfo: {
    padding: 20,
  },
  destinationText: {
    color: 'gray',
    fontSize: 14,
  },
  destinationRoute: {
    color: '#1E60ED',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  durationText: {
    color: 'gray',
    fontSize: 14,
  },
  tripList: {
    paddingHorizontal: 20,
  },
  tripCard: {
    backgroundColor: '#F1F2F3',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripInfo: {
    flex: 1,
  },
  tripRoute: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tripDuration: {
    color: 'gray',
    fontSize: 14,
  },
  tripTimeInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  tripTime: {
    fontSize: 16,
    color: 'black',
  },
  tripArrivalTime: {
    fontSize: 14,
    color: 'gray',
  },
  tripDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  companyName: {
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#1E60ED',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  footerButton: {
    alignItems: 'center',
  },
});
