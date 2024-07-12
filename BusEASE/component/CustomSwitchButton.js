import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomSwitchButton = ({ onSelectSwitch }) => {
  const [active, setActive] = useState(1);

  const updateSwitchData = (value) => {
    setActive(value);
    onSelectSwitch(value);
  };

  return (
    <View style={styles.switchContainer}>
      <TouchableOpacity
        style={[styles.switchButton, active === 1 && styles.activeButton]}
        onPress={() => updateSwitchData(1)}
      >
        <Text style={[styles.switchText, active === 1 && styles.activeText]}>One Way</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.switchButton, active === 2 && styles.activeButton]}
        onPress={() => updateSwitchData(2)}
      >
        <Text style={[styles.switchText, active === 2 && styles.activeText]}>Round Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 3,
    marginTop: 5,
    //paddingHorizontal: 10,
    //marginHorizontal:20,
  },
  switchButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: '#1E60ED',
  },
  switchText: {
    color: '#1E60ED',
    fontWeight: 'bold',
  },
  activeText: {
    color: 'white',
  },
});

export default CustomSwitchButton;
