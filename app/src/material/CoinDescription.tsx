/** @jsxImportSource @emotion/react */
import { Coin } from '@gamepark/nidavellir/material/Coin'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { CustomMoveType } from '@gamepark/nidavellir/moves/CustomMoveType'
import { RuleId } from '@gamepark/nidavellir/rules/RuleId'
import { ItemContext, RoundTokenDescription } from '@gamepark/react-game'
import { isCustomMoveType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import Images from '../images/Images'
import { CoinHelp } from './rules/CoinHelp'

export class CoinDescription extends RoundTokenDescription {
  diameter = 4
  backImage = Images.TokenBack
  images = {
    [Coin.Coin0]: Images.Bronze0,
    [Coin.Coin2]: Images.Bronze2,
    [Coin.Coin3]: Images.Bronze3,
    [Coin.Coin4]: Images.Bronze4,
    [Coin.Coin5]: Images.Bronze5,
    [Coin.GoldCoin5]: Images.Gold5,
    [Coin.GoldCoin6]: Images.Gold6,
    [Coin.GoldCoin7]: Images.Gold7,
    [Coin.GoldCoin8]: Images.Gold8,
    [Coin.GoldCoin9]: Images.Gold9,
    [Coin.GoldCoin10]: Images.Gold10,
    [Coin.GoldCoin11]: Images.Gold11,
    [Coin.GoldCoin12]: Images.Gold12,
    [Coin.GoldCoin13]: Images.Gold13,
    [Coin.GoldCoin14]: Images.Gold14,
    [Coin.GoldCoin15]: Images.Gold15,
    [Coin.GoldCoin16]: Images.Gold16,
    [Coin.GoldCoin17]: Images.Gold17,
    [Coin.GoldCoin18]: Images.Gold18,
    [Coin.GoldCoin19]: Images.Gold19,
    [Coin.GoldCoin20]: Images.Gold20,
    [Coin.GoldCoin21]: Images.Gold21,
    [Coin.GoldCoin22]: Images.Gold22,
    [Coin.GoldCoin23]: Images.Gold23,
    [Coin.GoldCoin24]: Images.Gold24,
    [Coin.GoldCoin25]: Images.Gold25,
    [Coin.HuntingMasterCoin]: Images.GreenCoin
  }

  help = CoinHelp

  canDrag(move: MaterialMove, context: ItemContext): boolean {
    const { index } = context
    return super.canDrag(move, context) || (isCustomMoveType(CustomMoveType.TradeCoins)(move) && move.data.includes(index))
  }

  getLocations(item: MaterialItem, { rules, index }: ItemContext) {
    if (item.id === undefined || rules.game.rule?.id !== RuleId.TradeCoin || item.location.type !== LocationType.Hand) return []
    return [{ type: LocationType.Coin, parent: index }]
  }

  isFlippedOnTable(item: MaterialItem, context: ItemContext) {
    if (this.isFlipped(item, context)) return true
    const { rules, player } = context
    const rule = rules.game.rule
    const isTransform = (rule?.id === RuleId.TransformCoin || rule?.id === RuleId.Grid) && rule.player === player
    return item.location.type === LocationType.PlayerBoard && !item.location.rotation && !isTransform
  }
}

export const coinDescription = new CoinDescription()
