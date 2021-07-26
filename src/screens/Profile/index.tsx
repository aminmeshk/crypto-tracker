import React, {useRef} from 'react';
import {
  Image,
  LayoutRectangle,
  PanResponder,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
} from 'react-native';
import {pointsDistance} from '../../utils/common';

const Profile: React.FC = (props) => {
  const dimensions = useWindowDimensions();
  const imageLayout = useRef<LayoutRectangle>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const activeTouches = evt.nativeEvent.changedTouches.length;
        // if (activeTouches === 1) {
        pan.current.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        });
        // } else
        if (activeTouches >= 2) {
          const touches = evt.nativeEvent.changedTouches;

          const tA = touches[0];
          const tB = touches[1];

          const distance = pointsDistance(
            [tA.pageX, tA.pageY],
            [tB.pageX, tB.pageY],
          );

          const screenMovedPercents = distance / dimensions.width;

          scale.current.setValue(1 + screenMovedPercents);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        Animated.parallel([
          Animated.spring(pan.current.x, {
            toValue: 0,
            useNativeDriver: false,
          }),
          Animated.spring(pan.current.y, {
            toValue: 0,
            useNativeDriver: false,
          }),
          Animated.spring(scale.current, {
            toValue: 1,
            useNativeDriver: false,
          }),
        ]).start();
      },
    }),
  ).current;

  const pan = useRef(new Animated.ValueXY({x: 0, y: 0}));
  const scale = useRef(new Animated.Value(1));

  return (
    <Animated.View
      style={[
        s.screen,
        {
          backgroundColor: scale.current.interpolate({
            inputRange: [1, 1.5],
            outputRange: ['white', 'black'],
            extrapolate: 'clamp',
          }),
        },
      ]}>
      <Animated.Image
        {...panResponder.panHandlers}
        source={require('../../../assets/images/avatar.jpg')}
        style={[
          s.image,
          {
            transform: [
              {translateX: pan.current.x},
              {translateY: pan.current.y},
              {scale: scale.current},
            ],
          },
        ]}
        onLayout={(event) => {
          imageLayout.current = event.nativeEvent.layout;
        }}
      />
    </Animated.View>
  );
};

const s = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 10,
  },
});

export default Profile;
