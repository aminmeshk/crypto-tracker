import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';
import {RootStackParamList} from '../../helpers/navigation';

type NavigationProp = StackNavigationProp<RootStackParamList, 'CryptoAdd'>;

interface Props {
  navigation: NavigationProp;
}

const CryptoList: React.FC<Props> = ({navigation, ...props}) => {
  return (
    <View>
      <Text>Crypto Add</Text>
    </View>
  );
};

export default CryptoList;
