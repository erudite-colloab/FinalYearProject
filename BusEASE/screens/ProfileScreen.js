import React, {useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../firebase/firebaseConfig';
import 'react-native-gesture-handler';

const ProfileScreen = () => {

  const [details, setDetails] = useState([]);

  const getUserData = async () => {
		try {
			var user = auth.currentUser;
			var uid;
			if (user != null) {
				uid = user.uid;
			}
			db.collection('users')
				.doc(uid)
				.get()
				.then((querySnapshot) => {
					setDetails(querySnapshot.data());
				});
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: 'https://placekitten.com/200/200' }} // Replace with your image URL
        />
        <Text style={styles.profileName}>{details.name}</Text>
        <Text style={styles.profileEmail}>Email: {details.Email}</Text>
      </View>
      <View style={styles.menuContainer}>
        <MenuItem icon="person-outline" text="Personal Info" />
        <MenuItem icon="card-outline" text="Payment Methods" />
        <MenuItem icon="settings-outline" text="General Settings" />
        <MenuItem icon="notifications-outline" text="Notifications" />
        <MenuItem icon="headset-outline" text="Support" />
      </View>
      <View style={styles.actionContainer}>
        <ActionItem icon="log-out-outline" text="Sign Out" />
        <ActionItem icon="trash-outline" text="Delete Account" />
      </View>
    </View>
  );
};

const MenuItem = ({ icon, text }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Icon name={icon} size={24} color="#1E60ED" />
    <Text style={styles.menuText}>{text}</Text>
    <Icon name="chevron-forward-outline" size={24} color="#4A4A4A" />
  </TouchableOpacity>
);

const ActionItem = ({ icon, text }) => (
  <TouchableOpacity style={styles.actionItem}>
    <Icon name={icon} size={24} color="#1E60ED" />
    <Text style={styles.actionText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 16,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 16,
    marginTop: 80,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  profileEmail: {
    fontSize: 14,
    color: 'gray',
  },
  menuContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  actionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  actionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: 'red',
  },
});

export default ProfileScreen;
