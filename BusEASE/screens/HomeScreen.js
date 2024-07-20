import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth } from "../firebase/firebaseConfig";
import CustomSwitchButton from "../component/CustomSwitchButton";
import { AuthContext } from "../context/AuthContext";
import * as Animatable from "react-native-animatable";
import { Modalize } from "react-native-modalize";
import PassengerBottomSheet from "../component/PassengerBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [from, setFrom] = useState("Kumasi, Asafo");
  const [to, setTo] = useState("Accra, Circle");
  const [departureDate, setDepartureDate] = useState(new Date("2024-07-04"));
  const [returnDate, setReturnDate] = useState(new Date("2024-07-04"));
  const [tripType, setTripType] = useState(1);
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [passengers, setPassengers] = useState({ adult: 1, child: 0 });

  const passengerSheetRef = useRef(null);

  const handleSwitchChange = (value) => {
    setTripType(value);
  };

  const onDepartureDateChange = (event, selectedDate) => {
    event.persist(); //retain event
    const currentDate = selectedDate || departureDate;
    setShowDeparturePicker(false);
    setDepartureDate(currentDate);
  };

  const onReturnDateChange = (event, selectedDate) => {
    event.persist(); //retain event
    const currentDate = selectedDate || returnDate;
    setShowReturnPicker(false);
    setReturnDate(currentDate);
  };

  const handleSearchTrip = () => {
    //navigation.navigate("Tickets", { screen: "Ticket" });
    navigation.navigate("Ticket" );
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={require("../assets/busbg.jpg")}
          style={styles.header}
          imageStyle={{ opacity: 0.4 }}
        >
          <View style={styles.headerContent}>
            <Text style={styles.appName}>be</Text>
            <Ionicons
              name="notifications"
              size={35}
              color="white"
              style={styles.notificationIcon}
            />
          </View>
          <Text style={styles.welcome}>Welcome, {auth.currentUser?.email}</Text>
        </ImageBackground>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Where to Today?</Text>
        </View>

        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <View style={styles.switchContainer}>
            <CustomSwitchButton onSelectSwitch={handleSwitchChange} />
          </View>

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

          <View style={styles.dateCard}>
            <TouchableOpacity
              style={[styles.dateWrapper, styles.dateLeft]}
              onPress={() => setShowDeparturePicker(true)}
            >
              <Ionicons name="calendar-outline" size={24} color="grey" />
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateLabel}>Departure</Text>
                <Text style={styles.dateText}>
                  {departureDate.toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
            {tripType === 2 && (
              <TouchableOpacity
                style={[styles.dateWrapper, styles.dateRight]}
                onPress={() => setShowReturnPicker(true)}
              >
                <Ionicons name="calendar-outline" size={24} color="grey" />
                <View style={styles.dateTextContainer}>
                  <Text style={styles.dateLabel}>Return Date</Text>
                  <Text style={styles.dateText}>
                    {returnDate.toLocaleDateString()}
                  </Text>
                </View>
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

          <TouchableOpacity
            style={styles.passengerCard}
            onPress={() => passengerSheetRef.current.open()}
          >
            <View style={styles.passengerRow}>
              <Ionicons name="people-sharp" size={24} color="gray" />
              <Text style={styles.passengerText}>Passengers</Text>
              <Text style={styles.passengerDetails}>
                Adult {passengers.adult}, Child {passengers.child}
              </Text>
              <Ionicons name="chevron-down" size={24} color="gray" />
            </View>
          </TouchableOpacity>

          <Button
            title="Search Trip"
            onPress={handleSearchTrip}
            buttonStyle={styles.searchButton}
            containerStyle={styles.searchButtonContainer}
            icon={<Ionicons name="search" size={30} color="white" />}
          />
        </Animatable.View>

        <Modalize
          ref={passengerSheetRef}
          snapPoint={300}
          modalHeight={300}
          handlePosition="inside"
          withHandle
        >
          <PassengerBottomSheet
            onClose={() => passengerSheetRef.current.close()}
            onPassengerChange={setPassengers}
            initialPassengers={passengers}
          />
        </Modalize>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
    backgroundColor: "#1e60ed",
    padding: 20,
  },
  headerContent: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  appName: {
    fontSize: 70,
    fontWeight: "bold",
    color: "white",
  },
  welcome: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  notificationIcon: {
    marginTop: 10,
    marginVertical: 20,
  },
  titleContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  switchContainer: {
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  tripCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderColor: "#1E60ED",
    borderWidth: 1,
    marginTop: 0,
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
  dateCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#1E60ED",
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  dateWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  dateLeft: {
    borderRightWidth: 1,
    borderRightColor: "#545455",
  },
  dateRight: {
    borderLeftWidth: 1,
    borderLeftColor: "gray",
  },
  dateTextContainer: {
    marginLeft: 10,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "gray",
  },
  passengerCard: {
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
  },
  passengerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  passengerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  passengerDetails: {
    fontSize: 16,
    color: "gray",
  },
  searchButton: {
    backgroundColor: "#1E60ED",
    borderRadius: 20,
    height: 50,
    marginHorizontal: 20,
  },
  searchButtonContainer: {
    margin: 20,
    width: "100%",
    alignSelf: "center",
  },
});

export default HomeScreen;
