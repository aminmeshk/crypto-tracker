export const formatNumber = (price: number) =>
  price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const pointsDistance: (
  p1: [number, number],
  p2: [number, number],
) => number = ([xA, yA], [xB, yB]) =>
  Math.sqrt(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2));
