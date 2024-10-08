import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  Pressable,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DropOffBottom = ({
  onTabChange,
  selectedTab,
  pickupPoint,
  dropoffPoint,
  setPickupPoint,
  setDropoffPoint,
  navigation,
  setStatus,
}) => {
  //const [animatedValue] = useState(new Animated.Value(0));

  const slide = useRef(new Animated.Value(300)).current;

  const slideUp = () => {
    // Will  slide up the bottom sheet
    Animated.timing(slide, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    // Will slide down the bottom sheet
    Animated.timing(slide, {
      toValue: 300,
      duration: 800,
      useNativeDriver: true,
    }).start(() => setStatus(false));
  };

  useEffect(() => {
    slideUp();
  }, []);

  // const closeModal = () => {
  //   slideDown();

  //   setTimeout(() => {
  //     setStatus(false);
  //   }, 800);
  // };

  return (
    <Pressable onPress={slideDown} style={styles.backdrop}>
      <Pressable style={{ width: "100%", height: "40%" }}>
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}
        >
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, selectedTab === "pickup" && styles.activeTab]}
              onPress={() => onTabChange("pickup")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "pickup" && styles.activeTabText,
                ]}
              >
                Pick-up Point
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === "dropoff" && styles.activeTab,
              ]}
              onPress={() => onTabChange("dropoff")}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === "dropoff" && styles.activeTabText,
                ]}
              >
                Drop-off Point
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="map-marker"
              size={24}
              color="grey"
              style={styles.icon}
            />
            <TextInput
              style={styles.textInput}
              placeholder={
                selectedTab === "pickup" ? "Pick-up point" : "Drop-off Point"
              }
              value={selectedTab === "pickup" ? pickupPoint : dropoffPoint}
              onChangeText={
                selectedTab === "pickup" ? setPickupPoint : setDropoffPoint
              }
            />
          </View>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => {
              /* Navigate to next screen or perform action */
              navigation.navigate('Tickets', {screen: 'PassengerDetails'})
            }}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
},
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#1E60ED",
  },
  tabText: {
    fontSize: 16,
    color: "gray",
  },
  activeTabText: {
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f7f7f7",
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    height: 45,
  },
  continueButton: {
    backgroundColor: "#1E60ED",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DropOffBottom;
