import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {RootStackParamList} from '../../helpers/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList, 'CryptoList'>;

interface Props {
  navigation: NavigationProp;
}

const CryptoList: React.FC<Props> = ({navigation, ...props}) => {
  return (
    <View style={s.screen}>
      <Text>Crypto List</Text>
      <Button title="Add" onPress={() => navigation.navigate('CryptoAdd')} />
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CryptoList;
