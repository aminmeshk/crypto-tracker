import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {RootStackParamList} from '../../helpers/navigation';
import {addCrypto} from '../../store/crypto/actions';

type NavigationProp = StackNavigationProp<RootStackParamList, 'CryptoAdd'>;

interface Props {
  navigation: NavigationProp;
}

const CryptoList: React.FC<Props> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const add = useCallback(() => {
    dispatch(addCrypto(name));
    navigation.goBack();
  }, [dispatch, name, navigation]);

  return (
    <View style={[s.screen, {paddingBottom: insets.bottom}]}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContainer}>
        <KeyboardAvoidingView style={s.container}>
          <Text style={s.header}>Add a Cryptocurrency</Text>
          <TextInput
            style={s.input}
            placeholder="Use a symbol like BTC or XRP"
            placeholderTextColor="lightgray"
            value={name}
            onChangeText={setName}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TouchableOpacity style={s.addTouchable} onPress={add}>
            <View style={s.buttonWrapper}>
              <Text style={[s.addText, name ? {} : s.disabledText]}>Add</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
  },
  scrollView: {},
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: 'black',
  },
  disabledText: {
    opacity: 0.2,
  },
  addIcon: {},
  buttonWrapper: {
    // borderColor: 'red',
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  addTouchable: {
    // borderColor: 'red',
    // borderWidth: 1,
    marginBottom: 16,
    backgroundColor: '#f8d452',
    borderRadius: 6,
    width: 120,
    alignSelf: 'flex-end',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  container: {
    alignSelf: 'stretch',
    paddingHorizontal: 16,
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderRadius: 6,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 12,
    paddingHorizontal: 6,
    color: 'black',
  },
});

export default CryptoList;
