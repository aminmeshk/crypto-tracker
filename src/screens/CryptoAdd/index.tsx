import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  useWindowDimensions,
  Easing,
  LayoutRectangle,
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
  const [containerLayout, setContainerLayout] = useState<LayoutRectangle>();
  const [objectLayout, setObjectLayout] = useState<LayoutRectangle>();
  const translation = useRef(new Animated.ValueXY({x: 0, y: 0}));
  const touch = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const {width, height} = useWindowDimensions();

  const add = useCallback(() => {
    dispatch(addCrypto(name));
    navigation.goBack();
  }, [dispatch, name, navigation]);

  const reset = useCallback(() => {
    translation.current.stopAnimation(() => {
      translation.current.setValue({x: 0, y: 0});
    });
  }, []);

  const play = useCallback(() => {
    if (!objectLayout || !containerLayout) {
      return;
    }
    Animated.sequence([
      Animated.parallel([
        Animated.timing(translation.current.x, {
          toValue: containerLayout.width - objectLayout.width,
          useNativeDriver: false,
          // mass: 1,
          easing: Easing.bounce,
          duration: 2000,
        }),
        Animated.timing(translation.current.y, {
          toValue:
            containerLayout.height - objectLayout.y - objectLayout.height,
          useNativeDriver: false,
          easing: Easing.bounce,
          duration: 1000,
        }),
      ]),
      Animated.spring(translation.current.y, {
        toValue: 0,
        useNativeDriver: false,
        speed: 1,
      }),
    ]).start();
  }, [containerLayout, objectLayout]);

  useEffect(() => {
    play();
  }, [play]);

  return (
    <View style={[s.screen, {paddingBottom: insets.bottom}]}>
      <StatusBar barStyle="light-content" />
      {/* <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContainer}> */}
      <Animated.View
        style={s.container}
        onLayout={(event) => {
          setContainerLayout(event.nativeEvent.layout);
        }}
        onStartShouldSetResponder={() => true}
        onResponderMove={(event) => {
          // console.log(event.nativeEvent.locationX, event.nativeEvent.locationY);
          touch.setValue({
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
          });
        }}
        onResponderRelease={(event) => {
          // Animated.timing(touch.current.y, {
          //   toValue: (containerLayout as LayoutRectangle).height - 50,
          //   useNativeDriver: false,
          //   easing: Easing.bounce,
          // }).start();
        }}>
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
        <TouchableOpacity style={s.addTouchable} onPress={add} disabled={!name}>
          <View style={s.buttonWrapper}>
            <Text style={[s.addText, name ? {} : s.disabledText]}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={s.addTouchable} onPress={reset}>
          <View style={s.buttonWrapper}>
            <Text style={[s.addText]}>Reset</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={s.addTouchable} onPress={play}>
          <View style={s.buttonWrapper}>
            <Text style={[s.addText]}>Play</Text>
          </View>
        </TouchableOpacity>
        <Animated.View
          onLayout={(event) => {
            setObjectLayout(event.nativeEvent.layout);
          }}
          style={[
            s.animatedView,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              transform: [
                {translateX: translation.current.x},
                {translateY: translation.current.y},
                {
                  rotate:
                    !containerLayout || !objectLayout
                      ? '0deg'
                      : translation.current.x.interpolate({
                          inputRange: [
                            0,
                            containerLayout.width - objectLayout.width,
                          ],
                          outputRange: ['0deg', '450deg'],
                        }),
                },
              ],
              opacity: !containerLayout
                ? 1
                : translation.current.x.interpolate({
                    inputRange: [
                      0,
                      (containerLayout.width - 100) / 2,
                      containerLayout.width - 100,
                    ],
                    outputRange: [1, 0, 1],
                  }),
              backgroundColor:
                !containerLayout || !objectLayout
                  ? 'blue'
                  : translation.current.y.interpolate({
                      inputRange: [
                        0,
                        containerLayout.height -
                          objectLayout.y -
                          objectLayout.height,
                      ],
                      outputRange: ['blue', 'crimson'],
                      extrapolate: 'clamp',
                    }),
            },
          ]}
        />
        <Animated.View
          style={{
            backgroundColor: 'orange',
            width: 100,
            height: 100,
            borderRadius: 50,
            position: 'absolute',
            left: Animated.subtract(touch.x, 50),
            top: Animated.subtract(touch.y, 50),
          }}
        />
      </Animated.View>
      {/* </ScrollView> */}
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
    flex: 1,
    alignSelf: 'stretch',
    // paddingHorizontal: 16,
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
  animatedView: {
    width: 100,
    height: 100,
    backgroundColor: 'crimson',
  },
});

export default CryptoList;
