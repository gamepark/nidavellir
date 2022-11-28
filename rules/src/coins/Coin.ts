
export enum CoinColor {
    Bronze = 1,
    Gold,
}

export type Coin = {
    color: CoinColor;
    value: number;
    copies?: number;
}
