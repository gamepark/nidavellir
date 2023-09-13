import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, Fragment, useMemo } from 'react'
import { Player } from '@gamepark/react-client'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { PlayerBoardSpace } from '@gamepark/nidavellir/material/PlayerBoardSpace'
import { MaterialComponent } from '@gamepark/react-game/dist/components/material/MaterialComponent'
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
            {!!getTavernCoin(tavern) && (
              <div css={tokenContainer(index)}>
                <MaterialComponent css={mini} type={MaterialType.Coin} itemId={getTavernCoin(tavern).getItem()!.id}/>
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

const mini = css`
  font-size: 1em;
`

const tokenContainer = (tavern: Tavern) => css`
  position: absolute;
  top: 8.8em;
  left: ${(tavern - 1) * 9 + 12}em;
`

export {PlayerPanelTaverns}
