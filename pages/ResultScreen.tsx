import React from 'react';
import { View, Text } from 'react-native';

export const ResultScreen: React.FC = ({response}) => {

    
  return (

    
    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
      <Text>{response}</Text>
    


    </View>
  );
};
