import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CryptoAddScreen, CryptoListScreen, ProfileScreen} from '../../screens';
import {RootStackParamList} from './types';
import {Image, Platform, StyleSheet} from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();

export const RootStackScreen: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#3b5675',
        height: 100,
      },
      headerTitleStyle: {
        // color: 'white',
      },
      headerTitleAlign: 'left',
      headerTintColor: 'white',
    }}>
    <Stack.Screen
      component={CryptoListScreen}
      name="CryptoList"
      options={{
        title: 'CryptoTracker Pro',
      }}
    />
    <Stack.Screen
      component={CryptoAddScreen}
      name="CryptoAdd"
      options={{
        title: 'Add a cryptocurrency',
        headerTitleAlign: Platform.OS === 'ios' ? 'center' : 'left',
      }}
    />
    <Stack.Screen
      component={ProfileScreen}
      name="Profile"
      options={{
        title: 'Profile',
        headerTitleAlign: Platform.OS === 'ios' ? 'center' : 'left',
      }}
    />
  </Stack.Navigator>
);
