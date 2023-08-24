import { SecretCoin } from "../state/view/SecretCoin";
import { LocatedCoin } from "../state/LocatedCoin";
import { Coins, HuntingMasterCoin } from "../coins/Coins";


export const isExchangeCoin = (coin: SecretCoin | LocatedCoin) => {
  return Coins[coin.id!].value === 0 || Coins[coin.id!] === HuntingMasterCoin
}