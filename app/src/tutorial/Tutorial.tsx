/** @jsxImportSource @emotion/react */
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { Trans } from 'react-i18next'
import { isMoveItemType } from '@gamepark/rules-api/dist/material/moves/items/MoveItem'
import { Coin } from '@gamepark/nidavellir/material/Coin'
import { PlayerBoardSpace } from '@gamepark/nidavellir/material/PlayerBoardSpace'
import { isEndPlayerTurn } from '@gamepark/rules-api/dist/material/moves/rules/EndPlayerTurn'
import { Card, CardId } from '@gamepark/nidavellir/cards/Cards'
import { TutorialSetup } from './TutorialSetup'
import { DwarfType } from '@gamepark/nidavellir/cards/DwarfType'
import { Tavern } from '@gamepark/nidavellir/material/Tavern'
import { ClotheType, EyebrowType, FacialHairType, TopType } from '@gamepark/avataaars'

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 1
  options = { players: 2 }
  setup = new TutorialSetup()

  players = [{ id: 1 }, {
    id: 2, name: 'Gimli',
    avatar: {
      facialHairType: FacialHairType.BeardMajestic,
      topType: TopType.WinterHat1,
      eyebrowType: EyebrowType.AngryNatural,
      clotheType: ClotheType.Overall,
      clotheColor: '#964B00'
    }
  }]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.start"><strong/><em/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.intro"><strong/><em/></Trans>
      }
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.tavern"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.location(LocationType.Tavern),
        this.material(game, MaterialType.Card).location(LocationType.Tavern)
      ]
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.tresor"><strong/><em/></Trans>
      },
      focus: (game) => this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me)
    },
    {
      popup: {
        position: { x: 20, y: 0 },
        text: () => <Trans defaults="tuto.bid"><strong/><em/></Trans>
      },
      focus: () => [
        this.location(LocationType.PlayerBoard).player(me).id(PlayerBoardSpace.LaughingGoblin),
        this.location(LocationType.PlayerBoard).player(me).id(PlayerBoardSpace.DancingDragon),
        this.location(LocationType.PlayerBoard).player(me).id(PlayerBoardSpace.ShiningHorse)
      ]
    },
    {
      popup: {
        position: { x: 10, y: 10 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 4 }}><strong/><em/></Trans>
      },
      focus: (game) => [
        this.location(LocationType.PlayerBoard).player(me).id(PlayerBoardSpace.LaughingGoblin),
        this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.Coin4).player(me)
      ],
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.position.location?.id === PlayerBoardSpace.LaughingGoblin
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin4).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 0 }}><strong/><em/></Trans>
      },
      focus: (game) => [
        this.location(LocationType.PlayerBoard).player(me).id(PlayerBoardSpace.DancingDragon),
        this.material(game, MaterialType.Coin).id(Coin.Coin0).player(me)
      ],
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.position.location?.id === PlayerBoardSpace.DancingDragon
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin0).player(me).getIndex()
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.coin.other"><strong/><em/></Trans>
      },
      focus: (game) =>
        [
          { type: MaterialType.PlayerBoard, item: { id: opponent, location: { id: opponent, type: LocationType.Table, player: opponent } } },
          this.material(game, MaterialType.Coin).player(opponent)
        ]
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.Coin)(move)
          && move.position.location?.id === PlayerBoardSpace.LaughingGoblin
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin5).player(opponent).getIndex()
      },
      focus: (game) =>
        [
          { type: MaterialType.PlayerBoard, item: { id: opponent, location: { id: opponent, type: LocationType.Table, player: opponent } } },
          this.material(game, MaterialType.Coin).player(opponent)
        ]
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.position.location?.id === PlayerBoardSpace.DancingDragon
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin2).player(opponent).getIndex()
      },
      focus: (game) =>
        [
          { type: MaterialType.PlayerBoard, item: { id: opponent, location: { id: opponent, type: LocationType.Table, player: opponent } } },
          this.material(game, MaterialType.Coin).player(opponent)
        ]
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.Coin)(move)
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin0).player(opponent).getIndex()
          && move.position.location?.id === PlayerBoardSpace.ShiningHorse
      },
      focus: (game) =>
        [
          { type: MaterialType.PlayerBoard, item: { id: opponent, location: { id: opponent, type: LocationType.Table, player: opponent } } },
          this.material(game, MaterialType.Coin).player(opponent)
        ]
    },
    {
      move: {
        player: opponent,
        filter: (move) => isEndPlayerTurn(move) && move.player === opponent
      }
    },
    {
      popup: {
        position: { x: 5, y: 0 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 2 }}><strong/><em/></Trans>
      },
      focus: (game) => [
        this.location(LocationType.PlayerBoard).player(me).id(PlayerBoardSpace.ShiningHorse),
        this.material(game, MaterialType.Coin).id(Coin.Coin2).player(me),
        this.location(LocationType.PlayerBoard).player(me).id(PlayerBoardSpace.Pouch1),
        this.location(LocationType.PlayerBoard).player(me).id(PlayerBoardSpace.Pouch2)
      ],
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.position.location?.id === PlayerBoardSpace.ShiningHorse
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin2).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 30, y: 20 },
        text: () => <Trans defaults="tuto.pouch"><strong/><em/></Trans>
      },
      focus: (game) => this
        .material(game, MaterialType.Coin)
        .player(me)
        .location((location) => location.type === LocationType.PlayerBoard && location.id > PlayerBoardSpace.ShiningHorse)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.resolution.1"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.LaughingGoblin)
      ]
    },
    {
      move: {
        player: me,
        filter: (move) => isEndPlayerTurn(move) && move.player === me
      },
      focus: (game) => this
        .material(game, MaterialType.Coin)
        .location(LocationType.PlayerBoard)
        .locationId(PlayerBoardSpace.LaughingGoblin)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.revealed"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.LaughingGoblin),
        this.material(game, MaterialType.Card).location(LocationType.Tavern).locationId(Tavern.LaughingGoblin)]
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => {
          return isMoveItemType(MaterialType.Card)(move)
            && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern)
              .id<CardId>(id => id.front === Card.WarriorGrade3_1).getIndex()
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.warrior"><strong/><em/></Trans>
      },
      focus: (game) => this
        .material(game, MaterialType.Card)
        .player(opponent)
        .location(LocationType.Army)
        .id<CardId>(id => id.front === Card.WarriorGrade3_1)
    },
    {
      popup: {
        position: { x: 0, y: 10 },
        text: () => <Trans defaults="tuto.hunter.me"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .location(LocationType.Tavern)
          .id<CardId>(id => id.front === Card.Hunter1),
        this.location(LocationType.Army)
          .player(me)
          .id(DwarfType.Hunter)

      ],
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.Hunter1).getIndex()
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.resolution.2"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.DancingDragon),
        this.material(game, MaterialType.Card).location(LocationType.Tavern).locationId(Tavern.DancingDragon)]
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex !== this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.MinerGrade0_1).getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.miner.me"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .location(LocationType.Tavern)
          .id<CardId>(id => id.front === Card.MinerGrade0_1),
        this.location(LocationType.Army)
          .player(me)
          .id(DwarfType.Miner)
      ],
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.MinerGrade0_1).getIndex()
      }
    },
    {
      popup: {
        position: { x: 20, y: 0 },
        text: () => <Trans defaults="tuto.exchange-coin"><strong/><em/></Trans>
      },
      focus: (game) => this
        .material(game, MaterialType.Coin)
        .location(LocationType.PlayerBoard)
        .player(me)
        .locationId((id) => id! > PlayerBoardSpace.ShiningHorse || id === PlayerBoardSpace.DancingDragon)
    },
    {
      popup: {
        position: { x: 20, y: 0 },
        text: () => <Trans defaults="tuto.exchange"><strong/><em/></Trans>
      },
      focus: (game) => this
        .material(game, MaterialType.Coin)
        .location(LocationType.PlayerBoard)
        .player(me)
        .locationId((id) => id! > PlayerBoardSpace.ShiningHorse || id === PlayerBoardSpace.DancingDragon)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.resolution.3"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.ShiningHorse),
        this.material(game, MaterialType.Card).location(LocationType.Tavern).locationId(Tavern.ShiningHorse)]
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.royal-offering.me"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card)
          .location(LocationType.Tavern)
          .id<CardId>(id => id.front === Card.RoyalOffering3),
        this.location(LocationType.Discard)
          .id(MaterialType.Card)
      ],
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.RoyalOffering3).getIndex()
      }
    },
    {
      popup: {
        position: { x: 20, y: 0 },
        text: () => <Trans defaults="tuto.transform"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).player(me).id(Coin.Coin2),
        this.material(game, MaterialType.Card).location(LocationType.Discard).id<CardId>(id => id.front === Card.RoyalOffering3)
      ],
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.itemIndex === this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).id(Coin.Coin2).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.MinerGrade1_1).getIndex()
      }
    }, {
      popup: {
        text: () => <Trans defaults="tuto.endturn.1"><strong/><em/></Trans>
      },
      focus: (game) => this.material(game, MaterialType.Card).location(LocationType.Tavern)
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 8 }}><strong/><em/></Trans>
      },
      focus: (game) => [
        this.location(LocationType.PlayerBoard).player(me).id(PlayerBoardSpace.LaughingGoblin),
        this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.GoldCoin8).player(me)
      ],
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.position.location?.id === PlayerBoardSpace.LaughingGoblin
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.GoldCoin8).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 5 }}><strong/><em/></Trans>
      },
      focus: (game) => [
        this.location(LocationType.PlayerBoard).player(me).id(PlayerBoardSpace.DancingDragon),
        this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.GoldCoin5).player(me)
      ],
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.position.location?.id === PlayerBoardSpace.DancingDragon
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.GoldCoin5).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 3 }}><strong/><em/></Trans>
      },
      focus: (game) => [
        this.location(LocationType.PlayerBoard).player(me).id(PlayerBoardSpace.ShiningHorse),
        this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.Coin3).player(me)
      ],
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.position.location?.id === PlayerBoardSpace.ShiningHorse
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin3).player(me).getIndex()
      }
    },
    {
      move: {
        player: me,
        filter: (move) => isEndPlayerTurn(move) && move.player === me
      }
    },

    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.position.location?.id === PlayerBoardSpace.LaughingGoblin
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin3).player(opponent).getIndex()
      }
    },

    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.position.location?.id === PlayerBoardSpace.DancingDragon
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin5).player(opponent).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.position.location?.id === PlayerBoardSpace.ShiningHorse
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.GoldCoin7).player(opponent).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move) => isEndPlayerTurn(move) && move.player === opponent
      }
    },
    {
      popup: {
        position: { x: 0, y: 20 },
        text: () => <Trans defaults="tuto.blacksmith.me"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.Blacksmith1),
        this.location(LocationType.Army)
          .player(me)
          .id(DwarfType.Blacksmith)
      ],
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.Blacksmith1).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.WarriorGrade6_1).getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 20 },
        text: () => <Trans defaults="tuto.tie"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.DancingDragon),
        this.material(game, MaterialType.Gem).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.Gem)
      ]
    },
    {
      popup: {
        position: { x: 0, y: 20 },
        text: () => <Trans defaults="tuto.gem"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.DancingDragon),
        this.material(game, MaterialType.Gem).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.Gem)
      ]
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.warrior.me"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.WarriorGrade4_1),
        this.location(LocationType.Army)
          .player(me)
          .id(DwarfType.Warrior)
      ],
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.WarriorGrade4_1).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.Blacksmith2).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.Hunter2).getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.explorer.me"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.ExplorerGrade11_1),
        this.location(LocationType.Army)
          .player(me)
          .id(DwarfType.Explorer)
      ],
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.ExplorerGrade11_1).getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.rank"><strong/><em/></Trans>
      },
      focus: (game) => this.material(game, MaterialType.Card).location(LocationType.Army).player(me).getIndexes().map(card =>
        this.location(LocationType.Grade).parent(card)
      )
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.recruitment"><strong/><em/></Trans>
      },
      focus: (game) => this.material(game, MaterialType.Card).location(LocationType.Army).player(me).getIndexes().map(card =>
        this.location(LocationType.Grade).parent(card)
      )
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.heroes"><strong/><em/></Trans>
      },
      focus: (game) => this.material(game, MaterialType.Card).location(LocationType.HeroesDeck)
    },
    {
      popup: {
        position: { x: 0, y: 15 },
        text: () => <Trans defaults="tuto.aral"><strong/><em/></Trans>
      },
      focus: (game) => [
        this.material(game, MaterialType.Card).location(LocationType.HeroesDeck).id<CardId>(id => id.front === Card.Aral),
        this.location(LocationType.Army)
          .player(me)
          .id(DwarfType.Hunter)
      ],
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.HeroesDeck).id<CardId>(id => id.front === Card.Aral).getIndex()
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.endturn.2"><strong/><em/></Trans>
      },
      focus: (game) => this.material(game, MaterialType.Card).location(LocationType.Age1Deck)
    },
    {
      popup: {
        position: { x: -40, y: 0 },
        text: () => <Trans defaults="tuto.distinctions"><strong/><em/></Trans>
      },
      focus: (game) => this.material(game, MaterialType.Distinction).location(LocationType.DistinctionsDeck)
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.endage.1"><strong/><em/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.endgame"><strong/><em/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.score"><strong/><em/></Trans>
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.go"><strong/><em/></Trans>
      }
    }
  ]
}