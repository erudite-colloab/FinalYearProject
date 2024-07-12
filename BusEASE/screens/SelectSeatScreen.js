import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const seats = [
  { id: '1A', available: true }, { id: '1B', available: false }, { id: '1C', available: true }, { id: '1D', available: true },
  { id: '2A', available: true }, { id: '2B', available: false }, { id: '2C', available: true }, { id: '2D', available: true },
  { id: '3A', available: true }, { id: '3B', available: true }, { id: '3C', available: false }, { id: '3D', available: true },
  { id: '4A', available: true }, { id: '4B', available: true }, { id: '4C', available: true }, { id: '4D', available: false },
  { id: '5A', available: true }, { id: '5B', available: true }, { id: '5C', available: true }, { id: '5D', available: true },
  { id: '6A', available: false }, { id: '6B', available: true }, { id: '6C', available: false }, { id: '6D', available: true },
];

const SeatSelectionScreen = ({ navigation }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeatSelection = (seatId) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter((id) => id !== seatId)
        : [...prevSelectedSeats, seatId]
    );
  };

  const renderSeat = ({ item }) => {
    const isBColumn = item.id.endsWith('B');
    const isCColumn = item.id.endsWith('C');

    return (
      <TouchableOpacity
        style={[
          styles.seat,
          item.available ? styles.availableSeat : styles.unavailableSeat,
          selectedSeats.includes(item.id) && styles.selectedSeat,
          isBColumn && styles.bColumn,
          isCColumn && styles.cColumn,
        ]}
        onPress={() => item.available && toggleSeatSelection(item.id)}
        disabled={!item.available}
      >
        <Text style={styles.seatText}>{item.id}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" type="ionicon" color="#fff" onPress={() => navigation.goBack()} style={styles.backButton}
        />
        <Text style={styles.headerTitle}>Seat Selection</Text>
      </View>
      <Text style={styles.stepText}>Step 1 of 5</Text>
      <View style={styles.statusContainer}>
        <View style={styles.statusItem}>
          <View style={[styles.statusIndicator, { backgroundColor: '#f7f7f7' }]} />
          <Text style={styles.statusText}>Empty</Text>
        </View>
        <View style={styles.statusItem}>
          <View style={[styles.statusIndicator, { backgroundColor: '#1E60ED' }]} />
          <Text style={styles.statusText}>Booked</Text>
        </View>
        <View style={styles.statusItem}>
          <View style={[styles.statusIndicator, { backgroundColor: 'green' }]} />
          <Text style={styles.statusText}>Selected</Text>
        </View>
      </View>
      <View style={styles.card}>
        <FlatList
          data={seats}
          renderItem={renderSeat}
          keyExtractor={(item) => item.id}
          numColumns={4}
          contentContainerStyle={styles.seatContainer}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.busInfo}>
          <Text style={styles.infoLabel}>Bus Number:</Text>
          <Text style={styles.infoText}>GR-2025-09</Text>
        </View>
        <View style={styles.selectedSeatsInfo}>
          <Text style={styles.infoLabel}>Selected Seat(s):</Text>
          <Text style={styles.selectedSeats}>{selectedSeats.join(', ')}</Text>
        </View>
      </View>
      <Button
        title="Confirm Seats"
        buttonStyle={styles.confirmButton}
        containerStyle={styles.confirmButtonContainer}
        onPress={() => navigation.navigate('Checkout', { selectedSeats })}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E60ED',
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 80,
    textAlign: 'center',
  },
  stepText: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  statusText: {
    fontSize: 14,
  },
  card: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  seatContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  seat: {
    width: 40,
    height: 40,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  availableSeat: {
    backgroundColor: '#1E60ED',
  },
  unavailableSeat: {
    backgroundColor: 'gray',
  },
  selectedSeat: {
    backgroundColor: 'green',
  },
  bColumn: {
    marginRight: 45,
  },
  cColumn: {
    marginLeft: 45,
  },
  seatText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  busInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  selectedSeatsInfo: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  infoLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSeats: {
    fontSize: 14,
    color: 'green',
  },
  confirmButton: {
    backgroundColor: '#1E60ED',
    borderRadius: 10,
    height: 50,
  },
  confirmButtonContainer: {
    marginHorizontal: 20,
  },
});

export default SeatSelectionScreen;
