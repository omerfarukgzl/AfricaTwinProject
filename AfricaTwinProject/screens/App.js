
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'
import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';

import SignIn from './SignIn/SignInView';
import SignUp from './SignUp/SignUpVİews';
import Maps from './Maps/MapsView';



const Stack = createNativeStackNavigator();


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} >
        <Stack.Screen name="SignIn" component={SignIn} options={{presentation:'fullScreenModal'}}  />
        <Stack.Screen name="SignUp" component={SignUp} options={{presentation:'fullScreenModal'}}/>
        <Stack.Screen name="Maps" component={Maps} options={{presentation:'fullScreenModal'}}/>
      </Stack.Navigator>

    </NavigationContainer>


  );
};

export default App;
