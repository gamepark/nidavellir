/** @jsxImportSource @emotion/react */
import { useRules, MaterialComponent } from '@gamepark/react-game'
import { css } from '@emotion/react'
import { FC, Fragment, useMemo } from 'react'
import { Player } from '@gamepark/react-client'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { PlayerBoardSpace } from '@gamepark/nidavellir/material/PlayerBoardSpace'
import { Tavern, taverns } from '@gamepark/nidavellir/material/Tavern'
import { PlayerPanelTavernIcon } from './PlayerPanelTavernIcon'

type PlayerPanelTavernsProps = {
  player: Player;
};

const PlayerPanelTaverns: FC<PlayerPanelTavernsProps> = (props) => {
  const {player} = props
  const rules = useRules<NidavellirRules>()!
  const coins = useMemo(() => rules.material(MaterialType.Coin).location((location) => location.type === LocationType.PlayerBoard && location.player === player.id &&  location.id < PlayerBoardSpace.Pouch1), [rules.game])
  const getTavernCoin = (tavern: Tavern) => coins.filter((item) => item.location.id === tavern)

  return (
    <div>
      {taverns.map((tavern, index) => {
        return (
          <Fragment key={tavern}>
            <PlayerPanelTavernIcon tavern={tavern} />
            {!!getTavernCoin(tavern).length && (
              <div css={tokenContainer(index)}>
                <MaterialComponent css={mini(getTavernCoin(tavern).getItem()?.id)} type={MaterialType.Coin} itemId={getTavernCoin(tavern).getItem()!.id}/>
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

const mini = (id?: number) => css`
  font-size: 1em;
  transform: rotateY(${id === undefined? '180deg': '0'});
`

const tokenContainer = (tavern: Tavern) => css`
  position: absolute;
  top: 8.8em;
  left: ${(tavern - 1) * 9 + 12}em;
`

export {PlayerPanelTaverns}
