import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CryptoAddScreen, CryptoListScreen} from '../../screens';
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
        headerRight: () => (
          <Image
            source={require('../../../assets/images/avatar.jpg')}
            style={s.avatarImage}
          />
        ),
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
  </Stack.Navigator>
);

const s = StyleSheet.create({
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginRight: 16,
    marginBottom: 6,
  },
});
