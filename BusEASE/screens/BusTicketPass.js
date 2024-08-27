import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import Icon from "react-native-vector-icons/MaterialIcons";

const BusTicketPass = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.header}>
          <View style={styles.backbtn}>
            <TouchableOpacity style={styles.goBack} onPress={() => navigation.navigate("Home")}>
              {/* <Ionicons name="chevron-back" size={37} color="white" /> */}
              <AntDesign name="home" size={30} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerTitle}>Bus Ticket Pass</Text>
          <TouchableOpacity>
            <Ionicons name="download" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.ticketContainer}>
          <View style={styles.topPart}>
            <Text style={styles.companyName}>STC InterCity</Text>
            <Text style={styles.tripType}>Round Trip</Text>
          </View>
          <View style={styles.locationContainer}>
            <Text style={styles.location}>Kumasi</Text>
            {/* <Text style={styles.subLocation}></Text> */}
            <View style={styles.dottedLineContainer}>
              <Text style={styles.dots}>..........</Text>
              <Icon name="directions-bus" size={24} style={styles.icon} />
              <Text style={styles.dots}>............</Text>
            </View>
            <Text style={styles.location}>Accra</Text>
            {/* <Text style={styles.subText}></Text> */}
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.dateRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Departure Date</Text>
                <Text style={styles.detailValue}>Fri, 05 Jun 2024</Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Arrival Date</Text>
                <Text style={styles.detailValue}>Fri, 05 Jun 2024</Text>
              </View>
            </View>
            <View style={styles.dateRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Number of Ticket</Text>
                <Text style={styles.detailValue}>2</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Seats Number</Text>
                <Text style={styles.detailValue}>7, 8, 11</Text>
              </View>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Vehicle Number</Text>
              <Text style={styles.detailValue}>GR-2025-09</Text>
            </View>

            <View style={styles.qrCodeContainer}>
              <QRCode
                value="https://example.com"
                size={150}
                color="black"
                backgroundColor="white"
              />
            </View>
            <Text style={styles.scanText}>Scan the code to get on the bus</Text>
          </View>
        </View>
        <View style={styles.footer}>
            <TouchableOpacity style={styles.downloadBtn}>
                <Text style={styles.downloadBtnTxt}>Download</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContainer: {
    flexGrow: 1, // Ensure the ScrollView uses the entire space available
    justifyContent: "space-between", // Adjusts the positioning of children in the main axis
  },
  header: {
    //flex: 1, // Flex value for the header
    backgroundColor: "#1e60ed",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    //position: 'absolute',
   

  },
  headerTitle: {
    fontSize: 20,
    color: "white",
    //justifyContent: "center",
    //alignItems: "center",
    //marginHorizontal: 100,
    fontWeight: "800",
  },
  goBack: {
    padding: 10
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 5,
  },
  tripType: {
    fontSize: 16,
    color: "#1e60ed",
    textAlign: "center",
    marginBottom: 10,
    backgroundColor: "#C9C9C9",
    borderRadius: 6,
    padding: 5,
  },
  topPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1e60ed",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  location: {
    fontSize: 20,
    //paddingLeft: 5,
    fontWeight: "bold",
    alignItems: "center",
    marginHorizontal: 15,
  },
  dottedLineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dots: {
    fontSize: 20,
    //paddingHorizontal: 2,
    lineHeight: 24,
  },
  icon: {
    paddingHorizontal: 5,
    color: "#007BFF", // Example color for the icon
  },
  ticketContainer: {
    //position: "absolute",
    //top: -10,
    marginTop: 20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsContainer: {
    //backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 7,
  },
  detailItem: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 16,
    color: "grey",
    marginBottom: 10, // Provides a gap between items for clarity
  },
  qrCodeContainer: {
    padding: 10,
    //borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderStyle: "dotted",
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  scanText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    alignItems: 'center',
    justifyContent: "center"
  },

//   footer: {
//     flex: 3, // Flex value for the footer
//     backgroundColor: "white",
//     //paddingVertical: 30,
//     paddingHorizontal: 20,
//   },
  downloadBtn: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
    //marginBottom: 40,
    marginVertical: 10,
    marginHorizontal: 25

  },
  downloadBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default BusTicketPass;
