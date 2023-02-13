import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import { BlueWhiteButton } from '../components/BlueWhiteButton'
import { Picker } from '@react-native-picker/picker'

export const RecipeFinder = ({navigation}) => {

    const [loading, setLoading] = useState(false);
    const [foodProduct, setFoodProduct] = useState('');
    const [style, setStyle] = useState('');
    const [diet, setDiet] = useState('');
    const [allergen, setAllergen] = useState('')

    const [response, setResponse] = useState('');

    




    const handleSendRequest = (foodProduct, style, diet, allergen) => {

      const anyFood = '<insert random food here>'
      const anyStyle = '<insert random style of cuisine here>'

      var pickedFood;
      var pickedStyle;

      if(foodProduct === '') {
        pickedFood = anyFood
      } else {
        pickedFood = foodProduct
      }

      if(style === '') {
        pickedStyle = anyStyle
      } else {
        pickedStyle = style
      }

      sendRequest(pickedFood, pickedStyle, diet, allergen)



    }
  


    const sendRequest = async (foodProduct, style, diet, allergen) => {

      setLoading(true)

      const message = `How to cook ${foodProduct} in a ${style} way? ${diet}. ${allergen}
      I want the recipe and instructions.
       Give the closest alternative if it is impossible. 
       It is of utmost importance you do not say anything else, 
       apart from the recipe and instructions. 
       Exception: say the word ALTERNATIVE at the start if you are offering an alternative.`

       console.log("Prompt : ", message)

      try {

        const res = await fetch('http://18.132.48.22:5000/chat', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              message: message
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


      // navigation.navigate('Result',  response )
      }



    }, [response])




  
  
    return (
      <View style={styles.container}>




      {response === '' ? (
        <>
          <Text style={styles.header}>Find Your Perfect Recipe</Text>
        <View style={styles.form}>
        <View style={styles.formElement}>
            <TextInput
              style={styles.input}
              placeholder="Style e.g. Chinese"
              value={style}
              onChangeText={text => setStyle(text)}
            />
          </View>


          <View style={styles.formElement}>
            <TextInput
              style={styles.input}
              placeholder="Food Product e.g. Pork belly"
              value={foodProduct}
              onChangeText={text => setFoodProduct(text)}
            />
          </View>

          <View style={styles.formElement}>
            <Picker
              style={styles.picker}
              selectedValue={diet}
              onValueChange={itemValue => setDiet(itemValue)}
            >
              <Picker.Item label="Diet requirements e.g. ketogenic" value="thanks" />
              <Picker.Item label="None" value="thanks" />
              <Picker.Item label="Low-Carb" value="must be suitable for low-carb diet" />
              <Picker.Item label="Ketogenic" value="must be suitable for ketogenic diet" />
              <Picker.Item label="Atkins" value="must be suitable for atkins diet" />
              <Picker.Item label="Vegetarian" value="must be suitable for vegetarian diet" />
              <Picker.Item label="Vegan" value="must be suitable for vegan diet" />
              <Picker.Item label="Pescatarian" value="must be suitable for pescatarian diet" />
              <Picker.Item label="Palaeolithic" value="must be suitable for palaeolithic diet" />
              <Picker.Item label="Mediterranean" value="must be suitable for mediterranean diet" />
              <Picker.Item label="Whole Food Plant-Based" value="must be suitable for whole food plant-based diet" />
              <Picker.Item label="Gluten-Free" value="must be suitable for gluten-free diet" />
              <Picker.Item label="Lacto-Ovo Vegetarian" value="must be suitable for lacto-ovo vegetarian diet" />
              <Picker.Item label="Low-Fat" value="must be suitable for low-fat diet" />
              <Picker.Item label="High-Protein" value="must be suitable for high-protein diet" />
            </Picker>
  
          </View>


          <View style={styles.formElement}>
            <Picker
              style={styles.picker}
              selectedValue={allergen}
              defaultValue={""}
              onValueChange={itemValue => setAllergen(itemValue)}
            >
            <Picker.Item label="Allergens" value="" />
            <Picker.Item label="Peanuts" value="Must not contain peanuts." />
            <Picker.Item label="Tree Nuts" value="Must not contain tree nuts." />
            <Picker.Item label="Milk" value="Must not contain milk." />
            <Picker.Item label="Eggs" value="Must not contain eggs." />
            <Picker.Item label="Fish" value="Must not contain fish." />
            <Picker.Item label="Shellfish" value="Must not contain shellfish." />
            <Picker.Item label="Soy" value="Must not contain soy." />
            <Picker.Item label="Wheat" value="Must not contain wheat." />
            <Picker.Item label="Gluten" value="Must not contain gluten." />
            </Picker>
  
          </View>



          <View style={styles.formElement}>


          {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <BlueWhiteButton style={styles.button} 
        onPress={() => handleSendRequest(foodProduct, style, diet, allergen)}
        title="Find Recipe"
        disabled={loading}>

        </BlueWhiteButton>
      )}



         

            <Text>{response}</Text>

          </View>
        </View>
        
        </>
      ) : (
        <>
        <ScrollView>
          <Text style={{fontSize : 21 }}>{response}</Text>
        </ScrollView>
          {/* <Text style={{marginTop: 30, fontSize : 11, fontWeight: 'bold' }}>{"With love, to my dearest Megan <3"}</Text> */}
        </>
      )}




        
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
