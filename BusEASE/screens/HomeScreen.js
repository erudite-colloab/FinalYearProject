import { StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Dimensions,
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  StatusBar,
  Alert } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { AuthContext } from '../context/AuthContext';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
const { name } = useContext(AuthContext);
console.log(name);

const [fromPlace, setFromPlace] = useState('');
const [toPlace, setToPlace] = useState('');
const [fromCoords, setFromCoords] = useState(null);
const [toCoords, setToCoords] = useState(null);
const [ mapRegion, setMapRegion ] = useState(null)

useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Permission to access location was denied');
      return;
    }
  })();
}, []);

// const [currentLocation, setCurrentLocation] = useState(null);
// const [location, setLocation] = useState({
// latitude: 6.188987,
// longitude: -1.631763,
// latitudeDelta: 0.0922,
// longitudeDelta: 0.0421,
// });
// const [destination, setDestination] = useState({
// latitude: 6.688987,
// longitude: -1.631763,
// });

// useEffect(() => {
// const getLocation = async () => {
// let { status } = await Location.requestForegroundPermissionsAsync();
// if (status !== "granted") {
//  console.log("Permission to access location was denied");
//  return;
// }

// let location = await Location.getCurrentPositionAsync({});
// setCurrentLocation(location.coords);

// setLocation({
//  latitude: location.coords.latitude,
//  longitude: location.coords.longitude,
//  latitudeDelta: 0.005,
//  longitudeDelta: 0.005,
// });
// };
// getLocation();
// }, []);

// const handleSearch = () => {
// if (!destination || !location) {
// Alert.alert('Validation Error', 'Please ensure all fields are filled correctly.');
// return;
// }
// navigation.navigate('Tickets');
// };
const handleSearch = async () => {
  try {
    const [fromLocation, toLocation] = await Promise.all([
      Location.geocodeAsync(fromPlace),
      Location.geocodeAsync(toPlace)
    ]);

    if (fromLocation.length > 0 && toLocation.length > 0) {

      if (fromLocation[0] && toLocation[0] && fromLocation[0].latitude != null && toLocation[0].latitude != null ){
        setFromCoords({
          latitude: fromLocation[0].latitude,
          longitude: fromLocation[0].longitude,
          //latitudeDelta: 0.0922,
          //longitudeDelta: 0.0421,
        });
        setToCoords({
          latitude: toLocation[0].latitude,
          longitude: toLocation[0].longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

         // Setting the map region to include both points
        setMapRegion({
          latitude: (fromLocation[0].latitude + toLocation[0].latitude) / 2,
          longitude: (fromLocation[0].longitude + toLocation[0].longitude) / 2,
          latitudeDelta: Math.abs(fromLocation[0].latitude - toLocation[0].latitude) * 2,
          longitudeDelta: Math.abs(fromLocation[0].longitude - toLocation[0].longitude) * 2,
        });
      
    } else {
      Alert.alert('Location Error', 'One or both locations were not found.');
      // Clear any existing coordinates if the locations were not found
      setFromCoords(null);
      setToCoords(null);
      }
    }else{
      Alert.alert('Location Error', 'Unable to locate specified places.');
      // Clear any existing coordinates if the locations were not found
      setFromCoords(null);
      setToCoords(null);
    }  
  } catch (error) {
    console.error('Error finding locations: ', error);
    Alert.alert('Error', 'There was an error processing your request.');
    setFromCoords(null);
    setToCoords(null);
  }
  navigation.navigate('Tickets');
};

return (
<KeyboardAvoidingView 
behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
style={{flex: 1}}
>
<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
 <View style={styles.container}>
   <View style={styles.header}>
     <View style={styles.headerTop}>
       <Text style={styles.title}>be.</Text>
       <TouchableOpacity style={styles.bellIcon}>
         <FontAwesome name="bell" size={24} color="#fff" />
       </TouchableOpacity>
     </View>
     <View style={styles.headerContent}>
       <Text style={styles.welcomeText}>Welcome {auth.currentUser?.email},</Text>
       <Text style={styles.questionText}>Where to today?</Text>
     </View>
     <View style={styles.detailRow}>
       <TouchableOpacity style={styles.detailButton}>
         <View style={styles.iconWithText}>
           <FontAwesome name="calendar" size={24} color="black" style={{alignItems: 'flex-start'}} />
           <Text style={styles.detailText}>Departure</Text>
         </View>
         <Text style={styles.detailsub}>Today</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.detailButton}>
         <View style={styles.iconWithText}>
           <FontAwesome name="user" size={24} color="black"  style={{alignItems: 'flex-start'}} />
           <Text style={styles.detailText}>Passengers</Text>
         </View>
         <Text style={styles.detailsub}>2</Text>
       </TouchableOpacity>
     </View>
   </View>

   <View style={styles.mapContainer}>
     { mapRegion && (
       <MapView 
         style={styles.map} 
         region={mapRegion} 
         provider={PROVIDER_GOOGLE}
        //  initialRegion={{
        //   latitude: (fromCoords.latitude + toCoords.latitude) / 2,
        //   longitude: (fromCoords.longitude + toCoords.longitude) / 2,
        //   latitudeDelta: Math.abs(fromCoords.latitude - toCoords.latitude) * 2,
        //   longitudeDelta: Math.abs(fromCoords.longitude - toCoords.longitude) * 2,
        //  }} 
         showsUserLocation={true} 
         showsMyLocationButton={true}
       >
         {fromCoords && 
           <Marker 
             coordinate={fromCoords}
             title='Your Location'
           />
         }
         {toCoords && <Marker coordinate={toCoords} title ="Destination"/> }
         
         {fromCoords && toCoords  && <Polyline coordinates={[fromCoords, toCoords]} strokeColor="#000" strokeWidth={3} />}
       </MapView>
     )}
   </View>

   <View style={styles.tripCard}>
     <View style={styles.row}>
       <View style={styles.iconContainer}>
         <FontAwesome name="bus" size={24} color="grey" />
         <View style={styles.dashedLine}></View>
       </View>
       <View style={styles.column}>
         <Text style={styles.label}>From</Text>
         <TextInput 
           style={[styles.input,styles.topInput]} 
           placeholder='Pick-up Location'
           value={fromPlace}
           onChangeText={setFromPlace}
           //editable={false}
         />
       </View>
       <Ionicons name="swap-vertical-outline" size={30} color="orange" style={styles.swapIcon} />
     </View>

     <View style={styles.row}>
       <FontAwesome name="bus" size={24} color="grey" />
       <View style={styles.column}>
         <Text style={styles.label}>To</Text>
         <TextInput 
           style={styles.input} 
           placeholder='Destination'
           value={toPlace}
           onChangeText={setToPlace}
         />
       </View>
     </View>
   </View>

   <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
     <Text style={styles.searchBtnTxt}>Search for a trip</Text>
   </TouchableOpacity>
 </View>
</ScrollView> 
</KeyboardAvoidingView>
);
};

export default HomeScreen;

const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor: 'white',
},
title: {
fontSize: 50,
fontWeight: 'bold',
color: '#fff',
},
header: {
backgroundColor: '#1E60ED',
paddingBottom: 20,
padding: 20,
borderBottomLeftRadius: 20,
borderBottomRightRadius: 20,
},
headerTop: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
},
headerContent: {
marginTop: 5,
},
bellIcon: {
justifyContent: 'center',
alignItems: 'center',
},
welcomeText: {
fontSize: 18,
fontWeight: 'bold',
marginTop: 5,
color: 'white',
},
questionText: {
fontSize: 16,
marginTop: 5,
color: 'white',
},
detailRow: {
flexDirection: 'row',
justifyContent: 'space-between',
marginTop: 10,
},
detailButton: {
flex: 1,
alignItems: 'flex-start',
padding: 10,
backgroundColor: '#fff',
borderRadius: 10,
marginHorizontal: 10,
marginBottom: 10,
height: 55,
},
iconWithText: {
flexDirection: 'row',
alignItems: 'flex-start',
},
detailText: {
fontSize: 14,
fontWeight: 'bold',
marginLeft: 5,
alignItems: 'center',
textAlign: 'center',
justifyContent: 'center',
},
detailsub: {
fontSize: 12,
color: 'gray',
marginTop: 1,
alignItems: 'center',
textAlign: 'center',
justifyContent: 'center',
},
mapContainer: {
flex: 1,
position: 'relative',
},
map: {
flex: 1,
width: Dimensions.get('window').width,
height: Dimensions.get('window').height / 3,
},
tripCard: {
backgroundColor: 'white',
padding: 15,
borderRadius: 10,
marginHorizontal: 10,
position: 'absolute',
top: 200,
left: 20,
right: 20,
marginTop: 20,
shadowColor: '#000',
shadowOpacity: 0.1,
shadowRadius: 10,
elevation: 5,
},
row: {
flexDirection: 'row',
alignItems: 'center',
marginVertical: 5,
},
column: {
flex: 1,
marginHorizontal: 10,
},
iconContainer: {
alignItems: 'center',
},
dashedLine: {
width: 1,
height: 20,
borderWidth: 1,
borderColor: 'grey',
borderStyle: 'dashed',
marginVertical: 5,
},
label: {
fontSize: 14,
color: 'grey',
marginBottom: 2,
},
input: {
fontSize: 16,
fontWeight: 'bold',
padding: 5,
},
topInput: {
borderBottomWidth: 1,
},
swapIcon: {
marginLeft: 10,
top: 30,
},
searchBtn: {
backgroundColor: '#1E60ED',
padding: 15,
borderRadius: 10,
alignItems: 'center',
marginHorizontal: 20,
position: 'absolute',
bottom: 20,
left: 20,
right: 20,
marginBottom: 50,
},
searchBtnTxt: {
color: 'white',
fontWeight: 'bold',
},
});
