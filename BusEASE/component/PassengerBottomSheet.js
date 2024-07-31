import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PassengerBottomSheet = ({ onClose, onPassengerChange, initialPassengers }) => {
  const [passengers, setPassengers] = useState(initialPassengers);

  const handlePassengerChange = (type, operation) => {
    setPassengers((prev) => {
      const newCount = operation === 'increment' ? prev[type] + 1 : prev[type] - 1;
      return { ...prev, [type]: newCount < 0 ? 0 : newCount };
    });
  };

  const handleDone = () => {
    onPassengerChange(passengers);
    onClose();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Passengers</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Adult</Text>
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => handlePassengerChange('adult', 'decrement')}>
            <Ionicons name="remove-circle-outline" size={30} color="gray" />
          </TouchableOpacity>
          <Text style={styles.count}>{passengers.adult}</Text>
          <TouchableOpacity onPress={() => handlePassengerChange('adult', 'increment')}>
            <Ionicons name="add-circle-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Child</Text>
        <View style={styles.counter}>
          <TouchableOpacity onPress={() => handlePassengerChange('child', 'decrement')}>
            <Ionicons name="remove-circle-outline" size={30} color="gray" />
          </TouchableOpacity>
          <Text style={styles.count}>{passengers.child}</Text>
          <TouchableOpacity onPress={() => handlePassengerChange('child', 'increment')}>
            <Ionicons name="add-circle-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  doneButton: {
    backgroundColor: '#1E60ED',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PassengerBottomSheet;
