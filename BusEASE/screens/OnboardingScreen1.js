import { View, 
        Text,
        StyleSheet,
        Image,
        TouchableOpacity,
    } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';


 const OnboardingScreen1 = ({ navigation }) => {
  return (
    <Onboarding
    onSkip={() => navigation.navigate('GetStarted')}
    onDone={() => navigation.navigate('GetStarted')}
  pages={[
    
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/onboard1.png')} style={{height:300, width:300}} />,
      title: 'Live Bus Location',
      subtitle: 'Track your bus in real-time and stay informed with our live bus location feature. Never miss a beat on your journey with BusEase',

    },
    {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/onboard2.png')} style={{height:300, width:300}} />,
        title: 'Book from Anywhere',
        subtitle: 'Book your bus from anywhere with ease! Say goodbye to long queues and waiting times.',
    },
    {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/onboard3.jpg')} style={{height:300, width:300}} />,
        title: 'Search',
        subtitle: 'Search for routes, tickets and schedules',
    },  
      
    ]}
    />
  );
};


export default OnboardingScreen1;