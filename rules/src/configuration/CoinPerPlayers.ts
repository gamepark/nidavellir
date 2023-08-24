import {Coin} from "../material/Coin";

export const moreThan3PlayersTreasure: Partial<Record<Coin, number>> = {
    [Coin.GoldCoin5]: 2,
    [Coin.GoldCoin6]: 2,
    [Coin.GoldCoin7]: 3,
    [Coin.GoldCoin8]: 2,
    [Coin.GoldCoin9]: 3,
    [Coin.GoldCoin10]: 2,
    [Coin.GoldCoin11]: 3,
    [Coin.GoldCoin12]: 2,
    [Coin.GoldCoin13]: 2,
    [Coin.GoldCoin14]: 2,
}

export const lessThan4PlayersTreasure: Partial<Record<Coin, number>> = {
    ...moreThan3PlayersTreasure,
    [Coin.GoldCoin7]: 1,
    [Coin.GoldCoin9]: 1,
    [Coin.GoldCoin11]: 1,


}