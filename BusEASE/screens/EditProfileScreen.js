import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";


const PersonalInfoScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Ama Doe");
  const [phoneNumber, setPhoneNumber] = useState("067097722");
  const [email, setEmail] = useState("red@gmail.com");

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Save the updated information
    setIsEditing(false);
    navigation.navigate("EmailVerification")
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'} Back</Text>
      </TouchableOpacity> */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Entypo
            name="chevron-thin-left"
            size={24}
            color="black"
            style={{ alignItems: "center", padding: 5 }}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Personal Info</Text>
      </View>
      <View style={styles.toggleButtonsContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, isEditing && styles.toggleButtonActive]}
          onPress={toggleEdit}
        >
          <Text
            style={[
              styles.toggleButtonText,
              isEditing && styles.toggleButtonTextActive,
            ]}
          >
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !isEditing && styles.toggleButtonActive]}
          onPress={toggleEdit}
        >
          <Text
            style={[
              styles.toggleButtonText,
              !isEditing && styles.toggleButtonTextActive,
            ]}
          >
            Overview
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri:
            "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
        }}
        style={styles.profileImage}
      />
      <TouchableOpacity>
        <Text style={styles.editImageText}>Edit</Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            isEditing ? styles.editableInput : styles.readOnlyInput,
          ]}
          value={name}
          onChangeText={setName}
          editable={isEditing}
          placeholder="Name"
        />
        <TextInput
          style={[
            styles.input,
            isEditing ? styles.editableInput : styles.readOnlyInput,
          ]}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          editable={isEditing}
          placeholder="Phone Number"
          keyboardType="phone-pad"
        />
        <TextInput
          style={[
            styles.input,
            isEditing ? styles.editableInput : styles.readOnlyInput,
          ]}
          value={email}
          onChangeText={setEmail}
          editable={isEditing}
          placeholder="Email address"
          keyboardType="email-address"
        />
      </View>

      {isEditing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
    backgroundColor: "white",
  },
  backButton: {
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",

    // Style for the back button
  },
  // backButtonText: {
  //   fontSize: 18,
  //   color: '#1E60ED',
  // },
  header: {
    flex: 0.5,
    backgroundColor: "#1E60ED",
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    //marginBottom: 30,
    color: "#fff",
    marginHorizontal: 100,
    //marginTop: 1,
  },
  toggleButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 30,
    padding: 15,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#1E60ED",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  toggleButtonActive: {
    backgroundColor: "#1E60ED",
  },
  toggleButtonText: {
    fontSize: 16,
    color: "#1E60ED",
    fontWeight: '600'
  },
  toggleButtonTextActive: {
    color: "white",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  editImageText: {
    color: "#1E60ED",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer :{
    flexDirection: "column",
    padding: 15
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    //padding: 15
  },
  editableInput: {
    borderColor: "#1E60ED",
  },
  readOnlyInput: {
    borderColor: "#ccc",
    backgroundColor: "#f2f2f2",
  },
  saveButton: {
    backgroundColor: "#1E60ED",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    height: 50,
    marginHorizontal: 15
  },
  saveButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: '600'
  },
});

export default PersonalInfoScreen;
