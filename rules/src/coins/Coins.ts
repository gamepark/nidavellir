import { Coin, CoinColor } from './Coin';

export const Coin0: Coin = {
  color: CoinColor.Bronze,
  value: 0,
  copies: 5,
};

export const Coin2: Coin = {
  color: CoinColor.Bronze,
  value: 2,
  copies: 5,
};

export const Coin3: Coin = {
  color: CoinColor.Bronze,
  value: 3,
  copies: 5,
};

export const Coin4: Coin = {
  color: CoinColor.Bronze,
  value: 4,
  copies: 5,
};

export const Coin5: Coin = {
  color: CoinColor.Bronze,
  value: 5,
  copies: 5,
};

export const GoldCoin5: Coin = {
  color: CoinColor.Gold,
  value: 5,
  copies: 2,
};

export const GoldCoin6: Coin = {
  color: CoinColor.Gold,
  value: 6,
  copies: 2,
};

export const GoldCoin7: Coin = {
  color: CoinColor.Gold,
  value: 7,
  copies: 3,
};

export const GoldCoin8: Coin = {
  color: CoinColor.Gold,
  value: 8,
  copies: 2,
};

export const GoldCoin9: Coin = {
  color: CoinColor.Gold,
  value: 9,
  copies: 3,
};

export const GoldCoin10: Coin = {
  color: CoinColor.Gold,
  value: 10,
  copies: 2,
};

export const GoldCoin11: Coin = {
  color: CoinColor.Gold,
  value: 11,
  copies: 3,
};

export const GoldCoin12: Coin = {
  color: CoinColor.Gold,
  value: 12,
  copies: 2,
};

export const GoldCoin13: Coin = {
  color: CoinColor.Gold,
  value: 13,
  copies: 2,
};

export const GoldCoin14: Coin = {
  color: CoinColor.Gold,
  value: 14,
  copies: 2,
};

export const GoldCoin15: Coin = {
  color: CoinColor.Gold,
  value: 15,
};

export const GoldCoin16: Coin = {
  color: CoinColor.Gold,
  value: 16,
};

export const GoldCoin17: Coin = {
  color: CoinColor.Gold,
  value: 17,
};

export const GoldCoin18: Coin = {
  color: CoinColor.Gold,
  value: 18,
};

export const GoldCoin19: Coin = {
  color: CoinColor.Gold,
  value: 19,
};

export const GoldCoin20: Coin = {
  color: CoinColor.Gold,
  value: 20,
};

export const GoldCoin21: Coin = {
  color: CoinColor.Gold,
  value: 21,
};

export const GoldCoin22: Coin = {
  color: CoinColor.Gold,
  value: 22,
};

export const GoldCoin23: Coin = {
  color: CoinColor.Gold,
  value: 23,
};

export const GoldCoin24: Coin = {
  color: CoinColor.Gold,
  value: 24,
};

export const GoldCoin25: Coin = {
  color: CoinColor.Gold,
  value: 25,
};

export const HuntingMasterCoin: Coin = {
  color: CoinColor.Green,
  value: 3,
};

export const Coins: Coin[] = [
  Coin0,
  Coin2,
  Coin3,
  Coin4,
  Coin5,
  GoldCoin5,
  GoldCoin6,
  GoldCoin7,
  GoldCoin8,
  GoldCoin9,
  GoldCoin10,
  GoldCoin11,
  GoldCoin12,
  GoldCoin13,
  GoldCoin14,
  GoldCoin15,
  GoldCoin16,
  GoldCoin17,
  GoldCoin18,
  GoldCoin19,
  GoldCoin20,
  GoldCoin21,
  GoldCoin22,
  GoldCoin23,
  GoldCoin24,
  GoldCoin25,
  HuntingMasterCoin,
].flatMap((coin) => Array(coin.copies || 1).fill(coin));
