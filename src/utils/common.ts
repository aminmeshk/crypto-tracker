export const formatNumber = (price: number) =>
  price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
