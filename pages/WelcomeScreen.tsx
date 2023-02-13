import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { BlackWhiteButton } from '../components/BlackWhiteButton'
import { BlueWhiteButton } from '../components/BlueWhiteButton'
import { RecipeFinder } from '../components/RecipeFinder'

// import { useNavigation, NavigationProp } from '@react-navigation/native';



type FormScreenParams = {
  id: string;
};


export const WelcomeScreen: React.FC = ({navigation}) => {


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

      <View>

      <View>
      <Text style={{ fontSize : 18, fontWeight: 'bold', letterSpacing: 7, marginBottom: 20 }}>ChefAI</Text>
      </View>
     

      <BlackWhiteButton 
      title="Register" />

      <BlueWhiteButton 
      title="Login" />


    <View style={{marginTop: 30}}>
    <BlackWhiteButton 
      onPress={() => navigation.navigate('Recipe')}
      title="Try" />

    </View>



      </View>


      <View style={styles.poweredByContainer}>
        <Image
          source={{
            uri: 'https://cdn.openai.com/better-call-saul/assets/images/openai-logo-icon.png',
          }}
          style={styles.logo}
        />
        <Text style={styles.poweredByText}>Powered by OpenAI</Text>
      </View>


      <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
    <Text style={{ fontSize: 10, color: 'gray' }}>
      All rights reserved - Calvin Chan 2023
    </Text>
  </View>
      


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subheader: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  poweredByContainer: {
    position: 'absolute',
    bottom: 180,
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  poweredByText: {
    fontSize: 12,
    color: 'gray',
  },
});
