import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, ListRenderItemInfo} from 'react-native';
import {FlatList} from 'react-native';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../helpers/navigation';
import MetricsResponse from '../../models/metricsResponse';
import {getMetricsStart} from '../../store/crypto/actions';
import {CryptoState} from '../../store/crypto/types';
import {formatNumber} from '../../utils/common';
import Icon from 'react-native-vector-icons/MaterialIcons';

type NavigationProp = StackNavigationProp<RootStackParamList, 'CryptoList'>;

interface Props {
  navigation: NavigationProp;
}

const CryptoList: React.FC<Props> = ({navigation, ...props}) => {
  const data = useSelector(
    (state: CryptoState) => state.cryptoMetrics.cachedData,
  );
  const isLoading = useSelector(
    (state: CryptoState) => state.cryptoMetrics.fetchInProgress,
  );
  const callError = useSelector(
    (state: CryptoState) => state.cryptoMetrics.error,
  );

  const dispatch = useDispatch();

  const callApi = useCallback(() => {
    dispatch(getMetricsStart(['BTC', 'LTC', 'ETH', 'XRP']));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getMetricsStart());
  // }, [dispatch]);

  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data.map((coin) => coin.data.symbol)));
    }
  }, [data]);

  const renderItem = (item: ListRenderItemInfo<MetricsResponse>) => {
    return (
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
            <Text
              style={[
                s.symbol,
                item.item.data.market_data.percent_change_usd_last_24_hours > 0
                  ? s.green
                  : s.red,
              ]}>
              {formatNumber(
                item.item.data.market_data.percent_change_usd_last_24_hours,
              ) + '%'}
            </Text>
          </View>
        </View>
        <View style={s.seperator} />
      </View>
    );
  };

  return (
    <View style={s.screen}>
      {isLoading && <ActivityIndicator />}
      {callError && <Text>{callError}</Text>}
      <Icon name="north-east" color="black" />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.data.id}
        style={s.flatList}
        contentContainerStyle={s.listContainer}
      />
      <Button title="Get Metrics" onPress={callApi} />
      <Button title="Add" onPress={() => navigation.navigate('CryptoAdd')} />
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#aaa',
  },
  flatList: {
    // borderColor: 'red',
    // borderWidth: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
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
});

export default CryptoList;
