import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MetricsResponse from '../../../models/metricsResponse';
import {formatNumber} from '../../../utils/common';

interface Props {
  item: ListRenderItemInfo<MetricsResponse>;
  onLongPress?: (item: ListRenderItemInfo<MetricsResponse>) => void;
}

const ListItem: React.FC<Props> = ({item, onLongPress, ...props}) => {
  const isUp = item.item.data.market_data.percent_change_usd_last_24_hours > 0;
  const {width} = useWindowDimensions();
  const comeIn = useRef(new Animated.Value(width));
  useEffect(() => {
    Animated.spring(comeIn.current, {
      toValue: 0,
      useNativeDriver: true,
      // easing: Easing.bounce,
    }).start();
  }, []);
  const animatedStyle = {
    transform: [
      {
        translateX: comeIn.current,
      },
    ],
  };
  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onLongPress={() => onLongPress && onLongPress(item)}
        activeOpacity={0.5}>
        <View>
          <View style={s.row}>
            <View style={s.nameContainer}>
              <Text style={s.name}>{item.item.data.name}</Text>
              <Text style={s.symbol}>{item.item.data.symbol}</Text>
            </View>
            <View style={s.priceContainer}>
              <Text style={s.name}>
                {'$' + formatNumber(item.item.data.market_data.price_usd)}
              </Text>
              <Text style={[s.symbol, isUp ? s.green : s.red]}>
                <Icon
                  name={isUp ? 'north-east' : 'south-west'}
                  color={isUp ? 'darkgreen' : 'darkred'}
                />
                {formatNumber(
                  item.item.data.market_data.percent_change_usd_last_24_hours,
                ) + '%'}
              </Text>
            </View>
          </View>
          <View style={s.seperator} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const s = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  nameContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  priceContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  symbol: {
    color: '#666',
  },
  green: {
    color: 'green',
  },
  red: {
    color: 'crimson',
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#aaa',
  },
});

export default ListItem;
