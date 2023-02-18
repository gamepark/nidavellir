export enum CoinColor {
  Bronze = 1,
  Gold,
  Green,
}

export type Coin = {
  color: CoinColor;
  value: number;
  copies?: number;
};
