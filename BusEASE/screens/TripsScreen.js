import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FeatherIcon from 'react-native-vector-icons/Feather';

const tripsData = {
  upcoming: {
    date: '12 May, 2024',
    from: 'Kumasi',
    to: 'Accra',
    duration: '6hrs 5min',
    timeLeft: '3 mins Left',
  },
  previous: [
    { from: 'Kumasi', to: 'Pokuaase', duration: '6hrs 58min', date: '10 May, 2024' },
    { from: 'Kumasi', to: 'Accra', duration: '6hrs 58min', date: '1st May, 2024' },
    { from: 'Kumasi', to: 'Sunyani', duration: '6hrs 24min', date: '25th April, 2024' },
  ],
};

const TripScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Trips</Text>
        <FeatherIcon name="more-vertical" size={24} color="#fff" />
      </View> */}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tripsData.upcoming.date}</Text>
        <Text style={styles.sectionSubtitle}>Upcoming Trips</Text>
        <View style={styles.tripCard}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 7.9465,
              longitude: -1.0232,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker coordinate={{ latitude: 7.9465, longitude: -1.0232 }} title="From Kumasi" />
            <Marker coordinate={{ latitude: 5.6037, longitude: -0.1870 }} title="To Accra" />
          </MapView>
          <View style={styles.tripInfo}>
            <Text style={styles.tripText}>From {tripsData.upcoming.from}</Text>
            <Text style={styles.tripDuration}>{tripsData.upcoming.duration}</Text>
            <Text style={styles.tripText}>To {tripsData.upcoming.to}</Text>
          </View>
          <View style={styles.tripStatus}>
            <Text style={styles.tripStatusText}>{tripsData.upcoming.timeLeft}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Previous Trips</Text>
        {tripsData.previous.map((trip, index) => (
          <View key={index} style={styles.tripCard}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 7.9465,
                longitude: -1.0232,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker coordinate={{ latitude: 7.9465, longitude: -1.0232 }} title="From Kumasi" />
              <Marker coordinate={{ latitude: 5.6037, longitude: -0.1870 }} title="To Accra" />
            </MapView>
            <View style={styles.tripInfo}>
              <Text style={styles.tripText}>From {trip.from}</Text>
              <Text style={styles.tripDuration}>{trip.duration}</Text>
              <Text style={styles.tripText}>To {trip.to}</Text>
            </View>
            <View style={styles.tripStatus}>
              <Text style={styles.tripStatusText}>Arrived</Text>
              <Text style={styles.tripStatusDate}>{trip.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1E60ED',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#a7a7a7',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  map: {
    height: 100,
  },
  tripInfo: {
    padding: 16,
  },
  tripText: {
    fontSize: 16,
    color: '#333',
  },
  tripDuration: {
    fontSize: 14,
    color: '#999',
    marginVertical: 4,
  },
  tripStatus: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#fe9400',
    padding: 8,
    borderRadius: 4,
  },
  tripStatusText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tripStatusDate: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
});

export default TripScreen;
