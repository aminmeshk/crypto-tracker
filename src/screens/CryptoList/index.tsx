import {StackNavigationProp} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {Alert, ListRenderItemInfo, StatusBar} from 'react-native';
import {FlatList} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../../helpers/navigation';
import MetricsResponse from '../../models/metricsResponse';
import {getMetricsStart, removeCrypto} from '../../store/crypto/actions';
import {CryptoState} from '../../store/crypto/types';
import {formatNumber} from '../../utils/common';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';

type NavigationProp = StackNavigationProp<RootStackParamList, 'CryptoList'>;

interface Props {
  navigation: NavigationProp;
}

const CryptoList: React.FC<Props> = ({navigation}) => {
  const data = useSelector(
    (state: CryptoState) => state.cryptoMetrics.cachedData,
  );
  const isLoading = useSelector(
    (state: CryptoState) => state.cryptoMetrics.fetchInProgress,
  );
  const callError = useSelector(
    (state: CryptoState) => state.cryptoMetrics.error,
  );
  const filteredCryptos = useSelector(
    (state: CryptoState) => state.filteredCryptos,
  );
  console.log('filteredCryptos: ', JSON.stringify(filteredCryptos));

  const insets = useSafeAreaInsets();

  const dispatch = useDispatch();

  const callApi = useCallback(() => {
    dispatch(getMetricsStart(filteredCryptos));
  }, [dispatch, filteredCryptos]);

  useEffect(() => {
    callApi();
  }, [callApi, filteredCryptos]);

  useEffect(() => {
    if (data) {
      console.log(JSON.stringify(data.map((coin) => coin.data.symbol)));
    }
  }, [data]);

  const removeItem = useCallback(
    (item: ListRenderItemInfo<MetricsResponse>) => {
      dispatch(removeCrypto(item.item.data.symbol));
    },
    [dispatch],
  );

  const promptRemove = useCallback(
    (item: ListRenderItemInfo<MetricsResponse>) => {
      Alert.alert(
        `Remove ${item.item.data.symbol}`,
        `Are you sure about removing ${item.item.data.name}?`,
        [
          {
            text: 'Remove',
            onPress: () => removeItem(item),
            style: 'destructive',
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ],
        {
          cancelable: true,
        },
      );
    },
    [removeItem],
  );

  const renderItem = (item: ListRenderItemInfo<MetricsResponse>) => {
    const isUp =
      item.item.data.market_data.percent_change_usd_last_24_hours > 0;
    return (
      <TouchableOpacity
        onLongPress={() => promptRemove(item)}
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
    );
  };

  const emptyComponent = (
    <Text style={s.emptyText}>
      Please add a Cryptocurrency using the button below
    </Text>
  );

  return (
    <View style={[s.screen, {paddingBottom: insets.bottom}]}>
      <StatusBar barStyle="light-content" />
      {callError && <Text>{callError}</Text>}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.data.id}
        style={s.flatList}
        contentContainerStyle={s.listContainer}
        refreshing={isLoading}
        onRefresh={callApi}
        ListEmptyComponent={emptyComponent}
        ListFooterComponent={
          data && data.length > 0 ? (
            <Text style={s.emptyText}>
              You can refresh the list by swiping down, and remove an item by
              long pressing
            </Text>
          ) : null
        }
      />
      <TouchableOpacity
        style={s.addTouchable}
        onPress={() => navigation.navigate('CryptoAdd')}>
        <View style={s.buttonWrapper}>
          <Icon name="add" color="#3b5675" style={s.addIcon} />
          <Text style={s.addText}>Add a Cryptocurrency</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#aaa',
  },
  flatList: {
    // borderColor: 'red',
    // borderWidth: 1,
    flex: 1,
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
  addText: {
    color: '#3b5675',
  },
  addIcon: {},
  buttonWrapper: {
    // borderColor: 'red',
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  addTouchable: {
    marginBottom: 16,
  },
  emptyText: {
    width: '80%',
    color: 'gray',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },
});

export default CryptoList;
