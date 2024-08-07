import { getEnumValues } from '@gamepark/rules-api'

export enum Coin {
    Coin0 = 1,
    Coin2,
    Coin3,
    Coin4,
    Coin5,

    // Gold starts from 10
    GoldCoin5 = 10,
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

    // Special hunting master coin
    HuntingMasterCoin = 100,
}


export const isGold = (coin: Coin) => coin >= Coin.GoldCoin5 && coin < Coin.HuntingMasterCoin
export const isBronze = (coin: Coin) => coin >= Coin.Coin0 && coin < Coin.GoldCoin5

export const coins = getEnumValues(Coin)
export const goldCoins = coins.filter(isGold)
export const bronzeCoins = coins.filter(isBronze)

