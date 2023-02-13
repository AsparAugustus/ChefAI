import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import { BlueWhiteButton } from '../components/BlueWhiteButton'
import { Picker } from '@react-native-picker/picker'

export const RecipeFinder = ({navigation}) => {

    const [loading, setLoading] = useState(false);
    const [foodProduct, setFoodProduct] = useState('');
    const [style, setStyle] = useState('');
    const [diet, setDiet] = useState('');

    const [response, setResponse] = useState('');
  
    // foodProduct, style, diet)
    // ${foodProduct} in a ${style} way? It must be a ${diet} option.
    const sendRequest = async () => {

      setLoading(true)

      try {

        const res = await fetch('http://18.132.48.22:5000/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              message: `How to cook cake in a french way? It must be a vegan option.
               I want the recipe and instructions.
                Give the closest alternative if it is impossible. 
                It is of utmost importance you do not say anything else, 
                apart from the recipe and instructions. 
                Exception: say the word ALTERNATIVE at the start if you are offering an alternative.`
          })
        })

        if(res.ok) {
          const data = await res.json();

          setResponse(data.response)
          setLoading(false)


          
  
        }


      } catch (err) {

        console.error(err);

      }

    }

    useEffect(() => {

      if(response === '') {
        return
      } else {


      navigation.navigate('Result',  response )
      }



    }, [response])




  
  
    return (
      <View style={styles.container}>




      {response !== '' ? (
        <ActivityIndicator size="large" />
      ) : (
        <BlueWhiteButton style={styles.button} 
        onPress={() => sendRequest()}
        title="Find Recipe"
        disabled={loading}>

        </BlueWhiteButton>
      )}




        <Text style={styles.header}>Find Your Perfect Recipe</Text>
        <View style={styles.form}>
          <View style={styles.formElement}>
            <TextInput
              style={styles.input}
              placeholder="Food Product e.g. Pork belly"
              value={foodProduct}
              onChangeText={text => setFoodProduct(text)}
            />
          </View>
          <View style={styles.formElement}>
            <TextInput
              style={styles.input}
              placeholder="Style e.g. Chinese"
              value={style}
              onChangeText={text => setStyle(text)}
            />
          </View>
          <View style={styles.formElement}>
            <Picker
              style={styles.picker}
              selectedValue={diet}
              onValueChange={itemValue => setDiet(itemValue)}
            >
              <Picker.Item label="Gluten-Free" value="gluten-free" />
              <Picker.Item label="Vegan" value="vegan" />
              <Picker.Item label="Ketogenic" value="ketogenic" />
              <Picker.Item label="Paleo" value="paleo" />
              <Picker.Item label="Low-Carb" value="low-carb" />
            </Picker>
  
          </View>
          <View style={styles.formElement}>


          {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <BlueWhiteButton style={styles.button} 
        onPress={() => sendRequest()}
        title="Find Recipe"
        disabled={loading}>

        </BlueWhiteButton>
      )}



         

            <Text>{response}</Text>

          </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 30,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    header: {
      fontSize: 24,
      marginBottom: 40,
      textAlign: 'center'
    },
    form: {
      width: '80%',
      margin: 10
    },
    formElement: {
      margin: 10,
    },
    input: {
      padding: 10,
      fontSize: 16,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    picker: {
      height: 50,
      width: '100%',
      color: '#344953',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#4CAF50',
      padding: 12,
      borderRadius: 5,
      width: '100%'
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold'
    }
  })
