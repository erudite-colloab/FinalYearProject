import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DropOffBottom from "../component/DropOffBottom";

const PickupDropoffScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState("pickup");
  const [pickupPoint, setPickupPoint] = useState("");
  const [dropoffPoint, setDropoffPoint] = useState("");
  //const [isVisible, setIsVisible] = useState(true);
  const [from, setFrom] = useState("Kumasi, Asafo");
  const [to, setTo] = useState("Accra, Circle");
  const [status, setStatus] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.6666,
          longitude: -1.6163,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
      </MapView>

      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.tripCard}>
        <View style={styles.row}>
          <FontAwesome
            name="bus"
            size={24}
            color="grey"
            style={styles.busIcon}
          />
          <View style={styles.dashedLine}></View>
          <View style={styles.column}>
            <Text style={styles.label}>From</Text>
            <TextInput
              style={[styles.input, styles.topInput]}
              placeholder="Your Location"
              value={from}
              onChangeText={setFrom}
            />
          </View>
          <Ionicons
            name="swap-vertical-outline"
            size={30}
            color="orange"
            style={styles.swapIcon}
          />
        </View>

        <View style={styles.row}>
          <FontAwesome
            name="bus"
            size={24}
            color="grey"
            style={styles.busIcon}
          />
          <View style={styles.column}>
            <Text style={styles.label}>To</Text>
            <TextInput
              style={[styles.input, styles.bottomInput]}
              placeholder="Kumasi"
              value={to}
              onChangeText={setTo}
            />
          </View>
        </View>  
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setStatus(true)}
      >
        <Text style={{fontSize:18, fontWeight: 'bold', color:'white' }}>Modal</Text>
      </TouchableOpacity>

      

      { status && <DropOffBottom
        //isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onTabChange={setSelectedTab}
        selectedTab={selectedTab}
        pickupPoint={pickupPoint}
        dropoffPoint={dropoffPoint}
        setPickupPoint={setPickupPoint}
        setDropoffPoint={setDropoffPoint}
        setStatus = {setStatus}
        navigation={navigation}
      /> }

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
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
    elevation: 2,
  },
  tripCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderColor: "#1E60ED",
    borderWidth: 1,
    marginTop: 80,
    height: 158,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  column: {
    flex: 1,
    marginHorizontal: 10,
  },
  busIcon: {
    marginRight: 10,
  },
  bottomInput: {
    marginBottom: 5,
  },
  dashedLine: {
    width: 1,
    height: 30,
    borderWidth: 1,
    borderColor: "grey",
    borderStyle: "dashed",
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    color: "#545455",
    marginBottom: 2,
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 5,
    borderBottomColor: "gray",
  },
  topInput: {
    borderBottomWidth: 1,
  },
  swapIcon: {
    marginLeft: 10,
    top: 30,
  },
  button: {
    paddingHorizontal: 30,
    backgroundColor:'#1e60ed',
    borderRadius: 10,
    top: 300,
    position: 'absolute',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center'

  }
});

export default PickupDropoffScreen;


