export enum CoinColor {
  Bronze = 1,
  Gold,
  Green,
}

export type CoinDescription = {
  color: CoinColor;
  value: number;
  copies?: number;
};
