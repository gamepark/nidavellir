import { Coins, HuntingMasterCoin } from '../coins/Coins'
import { Coin } from '../material/Coin'
import { MaterialItem } from '@gamepark/rules-api'

export const isExchangeCoin = (coin: MaterialItem) => {
  return Coins[coin.id as Coin].value === 0 || Coins[coin.id as Coin] === HuntingMasterCoin
}
