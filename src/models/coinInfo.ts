type CoinInfo = {
  id: string;
  symbol: string;
  name: string;
  market_data: {
    price_usd: number;
    percent_change_usd_last_24_hours: number;
  };
};

export default CoinInfo;
