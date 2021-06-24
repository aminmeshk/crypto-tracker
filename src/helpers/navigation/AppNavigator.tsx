import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CryptoAddScreen, CryptoListScreen} from '../../screens';
import {RootStackParamList} from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const RootStackScreen: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen component={CryptoListScreen} name="CryptoList" />
    <Stack.Screen component={CryptoAddScreen} name="CryptoAdd" />
  </Stack.Navigator>
);
