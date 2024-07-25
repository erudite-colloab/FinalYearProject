import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
  Modal,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";

const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [signOutModalVisible, setsignOutModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);

  const styles = createStyles(darkMode);

  const handleSignOut = () => {
    // Handle sign out logic here
    setsignOutModalVisible(false);
  };

  const handleDeleteAccount = () => {
    // Handle delete account logic here
    setDeleteAccountModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
        </View> */}

        <View style={styles.profile}>
          <Image
            alt=""
            source={{
              uri:
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
            }}
            style={styles.profileAvatar}
          />

          <Text style={styles.profileName}>Dickson Gray</Text>
          <Text style={styles.profileEmail}>red@gmail.com</Text>
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <View style={styles.row}>
              <FeatherIcon name="user" size={24} color="#000" />
              <Text style={styles.rowLabel}>Personal Info</Text>
              <FeatherIcon
                name="chevron-right"
                size={24}
                color="#000"
                style={styles.rowIconRight}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.row}>
              <FeatherIcon name="credit-card" size={24} color="#000" />
              <Text style={styles.rowLabel}>Payment</Text>
              <FeatherIcon
                name="chevron-right"
                size={24}
                color="#000"
                style={styles.rowIconRight}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.row}>
              <FeatherIcon name="headphones" size={24} color="#000" />
              <Text style={styles.rowLabel}>Support</Text>
              <FeatherIcon
                name="chevron-right"
                size={24}
                color="#000"
                style={styles.rowIconRight}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.row}>
            <FeatherIcon name="at-sign" size={24} color="#38C959" />
            <Text style={styles.rowLabel}>Email Notification</Text>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              style={styles.switch}
            />
          </View>
          <View style={styles.row}>
            <FeatherIcon name="message-circle" size={24} color="#38C959" />
            <Text style={styles.rowLabel}>SMS Notification</Text>
            <Switch
              value={smsNotifications}
              onValueChange={setSmsNotifications}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.row}>
            <FeatherIcon name="globe" size={24} color="#fe9400" />
            <Text style={styles.rowLabel}>Languages</Text>
            <Picker
              selectedValue={selectedLanguage}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="French" value="French" />
              <Picker.Item label="Spanish" value="Spanish" />
            </Picker>
          </View>
          <View style={styles.row}>
            <FeatherIcon name="moon" size={24} color="#007AFF" />
            <Text style={styles.rowLabel}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              style={styles.switch}
            />
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity>
            <View style={styles.row}>
              <FeatherIcon name="share-2" size={24} color="#000" />
              <Text style={styles.rowLabel}>Share App</Text>
              <FeatherIcon
                name="chevron-right"
                size={24}
                color="#000"
                style={styles.rowIconRight}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setsignOutModalVisible(true)}>
            <View style={styles.row}>
              <FeatherIcon name="log-out" size={24} color="#000" />
              <Text style={styles.rowLabel}>Sign Out</Text>
              <FeatherIcon
                name="chevron-right"
                size={24}
                color="#000"
                style={styles.rowIconRight}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDeleteAccountModalVisible(true)}>
            <View style={styles.row}>
              <FeatherIcon name="trash" size={24} color="red" />
              <Text style={styles.rowLabel}>Delete Account</Text>
              <FeatherIcon
                name="chevron-right"
                size={24}
                color="#000"
                style={styles.rowIconRight}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>BusEASE v1.0</Text>
        <Text style={styles.footerText}>Made in Knust</Text>
      </ScrollView>

      <Modal
        transparent={true}
        animationType="slide"
        visible={signOutModalVisible}
        onRequestClose={() => setsignOutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure you want to sign out?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleSignOut}>
              <Text style={styles.modalButtonText}>Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setsignOutModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="slide"
        visible={deleteAccountModalVisible}
        onRequestClose={() => setDeleteAccountModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Are you sure you want to delete your account?</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleDeleteAccount}>
              <Text style={styles.modalButtonText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCancel} onPress={() => setDeleteAccountModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const createStyles = (darkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? "#000" : "#f6f6f6",
    },
    scrollContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
    header: {
      backgroundColor: "#1E60ED",
      padding: 16,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#fff",
    },
    profile: {
      alignItems: "center",
      paddingVertical: 24,
      backgroundColor: "#fff",
      borderRadius: 8,
      marginBottom: 16,
    },
    profileAvatar: {
      width: 60,
      height: 60,
      borderRadius: 9999,
    },
    profileName: {
      fontSize: 20,
      fontWeight: "bold",
      color: darkMode ? "#fff" : "#000",
      marginVertical: 8,
    },
    profileEmail: {
      fontSize: 16,
      color: darkMode ? "#ccc" : "#848484",
    },
    section: {
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: darkMode ? "#fff" : "#a7a7a7",
      textTransform: "uppercase",
      marginBottom: 12,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: darkMode ? "#555" : "#e3e3e3",
    },
    rowLabel: {
      fontSize: 17,
      flex: 1,
      marginLeft: 12,
      color: darkMode ? "#fff" : "#000",
    },
    rowIconRight: {
      marginLeft: "auto",
    },
    switch: {
      marginLeft: "auto",
    },
    picker: {
      height: 50,
      width: 150,
      color: darkMode ? "#fff" : "#000",
      marginLeft: "auto",
    },
    footerText: {
      textAlign: "center",
      color: darkMode ? "#ccc" : "#848484",
      marginBottom: 4,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: "#fff",
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
      marginHorizontal: 6,
    },
    modalButton: {
      backgroundColor: "#FF0060",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
    },
    modalButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: '600'
    },
    modalCancel: {
      paddingVertical: 10,
    },
    modalCancelText: {
      color: "#888",
      fontSize: 16,
    },
  });

export default SettingsScreen;
