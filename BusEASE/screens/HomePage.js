// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/Ionicons';
// import MapView, { Marker } from 'react-native-maps';

// const HomePage = () => {
//   const [from, setFrom] = useState('698 Main St, Pomeroy, OH');
//   const [to, setTo] = useState('1034 Bellefontaine, Lima, OH');
//   const [date, setDate] = useState('29 Aug, 2022');
//   const [passengers, setPassengers] = useState(3);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }} />
//         <Marker coordinate={{ latitude: 37.75825, longitude: -122.4624 }} />
//         <Marker coordinate={{ latitude: 37.76825, longitude: -122.4824 }} />
//       </MapView>
//       <View style={styles.formContainer}>
//         <Text style={styles.header}>Find a route, Let's make a journey.</Text>
//         <View style={styles.tripTypeContainer}>
//           <TouchableOpacity style={[styles.tripTypeButton, styles.oneWay]}>
//             <Text style={styles.tripTypeText}>One Way</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={[styles.tripTypeButton, styles.roundTrip]}>
//             <Text style={styles.tripTypeText}>Round Trip</Text>
//           </TouchableOpacity>
//         </View>
//         <TextInput style={styles.input} value={from} onChangeText={setFrom} placeholder="From" />
//         <TextInput style={styles.input} value={to} onChangeText={setTo} placeholder="To" />
//         <View style={styles.dateContainer}>
//           <TextInput style={styles.dateInput} value={date} onChangeText={setDate} placeholder="Date" />
//           <TextInput style={styles.dateInput} value={passengers} onChangeText={setPassengers} placeholder="Passengers" />
//         </View>
//         <Button
//           title="Search Ticket"
//           buttonStyle={styles.searchButton}
//           containerStyle={styles.searchButtonContainer}
//           icon={<Icon name="search" size={20} color="white" />}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//   },
//   map: {
//     width: '100%',
//     height: '30%',
//   },
//   formContainer: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     marginTop: -20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   tripTypeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   tripTypeButton: {
//     padding: 10,
//     borderRadius: 20,
//     marginHorizontal: 5,
//   },
//   oneWay: {
//     backgroundColor: 'lightgray',
//   },
//   roundTrip: {
//     backgroundColor: 'blue',
//   },
//   tripTypeText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   dateInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     borderRadius: 5,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     width: '48%',
//   },
//   searchButton: {
//     backgroundColor: 'blue',
//     borderRadius: 20,
//   },
//   searchButtonContainer: {
//     marginTop: 20,
//   },
// });

// export default HomePage;
