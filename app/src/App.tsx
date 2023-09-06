import { MaterialGame } from "@gamepark/rules-api";
import { useEffect, useState } from "react";
import { GameDisplay } from "./GameDisplay";
import { useGame, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, FailuresDialog, FullscreenDialog } from "@gamepark/react-game";
import { RuleId } from "@gamepark/nidavellir/rules/RuleId";
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

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
      <LoadingScreen display={loading} author="Wolfgang Kramer" artist="Yann Valeani" publisher="Super Meeple" developer="Game Park"/>
      <MaterialHeader rulesStepsHeaders={RulesHeaders} GameOver={() => <p />} loading={loading}/>
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)}/>
      <Menu/>
      <FailuresDialog/>
      <FullscreenDialog/>
    </>
  )
}

const RulesHeaders: Record<RuleId, () => ReactJSXElement> = {
  [RuleId.EnterDwarves]: () => <p></p>,
  [RuleId.Bids]: () => <p></p>,
  [RuleId.BidRevelation]: () => <p></p>,
  [RuleId.UlineBid]: () => <p></p>,
  [RuleId.ChooseCard]: () => <p></p>,
  [RuleId.RecruitHero]: () => <p></p>,
  [RuleId.TradeCoin]: () => <p></p>,
  [RuleId.TransformCoin]: () => <p></p>,
  [RuleId.KingsHand]: () => <p></p>,
  [RuleId.HuntingMaster]: () => <p></p>,
  [RuleId.CrownJeweler]: () => <p></p>,
  [RuleId.KingsGreatArmorer]: () => <p></p>,
  [RuleId.PioneerOfTheKingdom]: () => <p></p>,
  [RuleId.GemTrade]: () => <p></p>,
  [RuleId.Bonfur]: () => <p></p>,
  [RuleId.Dagda]: () => <p></p>,
  [RuleId.Grid]: () => <p></p>,
  [RuleId.Thrud]: () => <p></p>,
  [RuleId.Uline]: () => <p></p>,
  [RuleId.Ylud]: () => <p></p>,
}