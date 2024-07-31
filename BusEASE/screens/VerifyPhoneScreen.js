import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import CountryPicker from 'react-native-country-picker-modal';



const UpdatePhoneNumberScreen = ({ navigation }) => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+233");
  const [selectedCountry, setSelectedCountry] = useState({
    cca2: 'GH',
    callingCode: '233'
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationMethod, setVerificationMethod] = useState("sms");

  const handleContinue = () => {
    navigation.navigate("AuthStack", {screen: "OTPverification"} );

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      
        <Text style={styles.title}>Update phone number</Text>
        <View style={styles.body}>
        <Text style={styles.subtitle}>We'll send a code for verification</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={selectedCountryCode}
            style={styles.countryCodePicker}
            onValueChange={(itemValue, itemIndex) => setSelectedCountryCode(itemValue)}

          >
            <Picker.Item label="🇬🇭 +233" value="+233" />
            <Picker.Item label="🇳🇬 +234" value="+234" />
            <Picker.Item label="🇺🇸 +1" value="+1" />
            
          </Picker>
          {/* <CountryPicker
            withFilter
            withFlag
            withCountryNameButton={false}
            withCallingCode
            withEmoji
            countryCode={selectedCountry.cca2}
            onSelect={(country) => {
              setSelectedCountry({
                cca2: country.cca2,
                callingCode: country.callingCode[0]
              });
            }}
            containerButtonStyle={styles.countryCodePicker}
          /> */}
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="555509876"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <View style={styles.radioContainer}>
          <View style={styles.radioButtonRow}>
            <RadioButton
              value="sms"
              status={verificationMethod === "sms" ? "checked" : "unchecked"}
              onPress={() => setVerificationMethod("sms")}
            />
            <Text style={styles.radioLabel}>Use SMS</Text>
            <MaterialCommunityIcons name="android-messages" size={30} color="black" style={styles.icon_row1}/>
          </View>
          <View style={styles.radioButtonRow}>
          
            <RadioButton
              value="whatsapp"
              status={
                verificationMethod === "whatsapp" ? "checked" : "unchecked"
              }
              onPress={() => setVerificationMethod("whatsapp")}
            />
            <Text style={styles.radioLabel}>Use WhatsApp</Text>
            <FontAwesome6 name="whatsapp" size={30} color="green" style={styles.icon_row}/>
          </View>
        </View>
      </View>
      <Text style={styles.note}>
        BusEase will not send anything without your consent
      </Text>
      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Send codes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  backButton: {
    marginBottom: 20,
    position: "absolute",
    top: 20,
    left: 10,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "000",
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  body: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    //justifyContent: "space-between"
  },
  countryCodePicker: {
    width: 80,
    height: 50,
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    borderRadius: 5,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    
  },
  phoneNumberInput: {
    flex: 1,
    height: 50,
    backgroundColor: "#f0f0f0",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingLeft: 10,
    marginLeft: 10,
    fontSize: 16,
  },
  radioContainer: {
    marginBottom: 40,
  },
  radioButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 16,
  },
  icon_row : {
    //flexDirection: "row",
    marginLeft: 150
  },
  icon_row1 : {
    //flexDirection: "row",
    marginLeft: 190
  },
  note: {
    fontSize: 14,
    color: "gray",
    marginBottom: 40,
  },
  continueButton: {
    backgroundColor: "#1E60ED",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: '500'
  },
});

export default UpdatePhoneNumberScreen;
