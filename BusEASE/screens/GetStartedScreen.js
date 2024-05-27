import { View, 
        Text, 
        StyleSheet,
        TouchableOpacity,
     } from 'react-native'
import React from 'react'


export default function GetStartedScreen( {navigation} ) {
  const login = () => {
    navigation.navigate('AuthStack', {
      screen: 'LoginScreen',
    });
  }

  return (
    <View style={styles.container}>
       <View style={styles.logo} >
        <Text style={{fontSize:64, fontWeight:'900', color:'white'}}>be.</Text>
       </View>
            
        
      <Text style={styles.text}>Welcome to BusEase! 🚌 Get ready to simplify 
        your journey with us. Explore hassle-free booking, real-time updates, 
        and more. Let's make traveling easier together!
      </Text>
      <View style={styles.btn}>
        <TouchableOpacity 
          style={styles.button}
          onPress={login}
        >
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}




const styles = StyleSheet.create({
    container:{
        backgroundColor: '#1e60ed',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    logo:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
        //flex: 0.2,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        //alignItems: 'center',
        //justifyContent: 'center',
        marginBottom: 20,
        textAlign: 'center',
        //marginTop: 100,
        padding: 20,

    },
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 257,
        height: 60,
        marginTop: 10,
        marginLeft: 60
    },
    btn: {
      paddingLeft: 15,
      justifyContent: 'center',
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})