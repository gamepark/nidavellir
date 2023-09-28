import { MaterialGame } from '@gamepark/rules-api'
import { FC, useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { FailuresDialog, FullscreenDialog, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { RuleId } from '@gamepark/nidavellir/rules/RuleId'
import { EnterDwarvesHeader } from './headers/EnterDwarvesHeader'
import { BidHeader } from './headers/BidHeader'
import { BidRevelationHeader } from './headers/BidRevelationHeader'
import { UlineBidHeader } from './headers/UlineBidHeader'
import { ElvalandTurnHeader } from './headers/ElvalandTurnHeader'
import { RecruitHeroHeader } from './headers/RecruitHeroHeader'
import { GemTradeHeader } from './headers/GemTradeHeader'
import { TradeCoinHeader } from './headers/TradeCoinHeader'
import { TransformCoinHeader } from './headers/TransformCoinHeader'
import { HuntingMasterHeader } from './headers/HuntingMasterHeader'
import { CrownJewelerHeader } from './headers/CrownJewelerHeader'
import { KingsHandHeader } from './headers/KingsHandHeader'
import { KingsGreatArmorerHeader } from './headers/KingsGreatArmorerHeader'
import { PioneerOfTheKingdomHeader } from './headers/PioneerOfTheKingdomHeader'
import { BonfurHeader } from './headers/BonfurHeader'
import { DagdaHeader } from './headers/DagdaHeader'
import { DrawCardHeader } from './headers/DrawCardHeader'
import { ThrudHeader } from './headers/ThrudHeader'
import { UlineHeader } from './headers/UlineHeader'
import { YludHeader } from './headers/YludHeader'

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 1000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      <GameDisplay/>
      <LoadingScreen display={loading} author="Serge Laget" artist="Jean Marie Minguez" publisher="Grrre Games" developer="Game Park"/>
      <MaterialHeader rulesStepsHeaders={RulesHeaders} loading={loading}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}

const RulesHeaders: Record<RuleId, FC> = {
  [RuleId.EnterDwarves]: EnterDwarvesHeader,
  [RuleId.Bids]: BidHeader,
  [RuleId.BidRevelation]: BidRevelationHeader,
  [RuleId.UlineBid]: UlineBidHeader,
  [RuleId.ElvalandTurn]: ElvalandTurnHeader,
  [RuleId.RecruitHero]: RecruitHeroHeader,
  [RuleId.TradeCoin]: TradeCoinHeader,
  [RuleId.TransformCoin]: TransformCoinHeader,
  [RuleId.KingsHand]: KingsHandHeader,
  [RuleId.HuntingMaster]: HuntingMasterHeader,
  [RuleId.CrownJeweler]: CrownJewelerHeader,
  [RuleId.KingsGreatArmorer]: KingsGreatArmorerHeader,
  [RuleId.PioneerOfTheKingdom]: PioneerOfTheKingdomHeader,
  [RuleId.GemTrade]: GemTradeHeader,
  [RuleId.Bonfur]: BonfurHeader,
  [RuleId.Dagda]: DagdaHeader,
  [RuleId.Grid]: TransformCoinHeader,
  [RuleId.Thrud]: ThrudHeader,
  [RuleId.Uline]: UlineHeader,
  [RuleId.Ylud]: YludHeader,
  [RuleId.EndOfTurn]: () => <p></p>,
  [RuleId.EndOfAge]: () => <p></p>,
  [RuleId.DrawCard]: DrawCardHeader
}