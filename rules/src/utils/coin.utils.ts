
import { Coins, HuntingMasterCoin } from "../coins/Coins";
import {MaterialItem} from "@gamepark/rules-api"


export const isExchangeCoin = (coin: MaterialItem) => {
  return Coins[coin.id!].value === 0 || Coins[coin.id!] === HuntingMasterCoin
}