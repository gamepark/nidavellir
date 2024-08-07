/** @jsxImportSource @emotion/react */
import { ClotheType, EyebrowType, FacialHairType, TopType } from '@gamepark/avataaars'
import { Card, CardId } from '@gamepark/nidavellir/cards/Cards'
import { DwarfType } from '@gamepark/nidavellir/cards/DwarfType'
import { Coin } from '@gamepark/nidavellir/material/Coin'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerBoardSpace } from '@gamepark/nidavellir/material/PlayerBoardSpace'
import { Tavern } from '@gamepark/nidavellir/material/Tavern'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { TutorialSetup } from './TutorialSetup'

const me = 1
const opponent = 2

export class Tutorial extends MaterialTutorial<PlayerId, MaterialType, LocationType> {
  version = 5
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
        position: { x: 40, y: 10 },
        text: () => <Trans defaults="tuto.tavern"><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.Tavern }],
        materials: [this.material(game, MaterialType.Card).location(LocationType.Tavern)],
        margin: { right: 30 }
      })
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.tresor"><strong/><em/></Trans>
      },
      focus: game => ({
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me)],
        scale: 0.4
      })
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.bid"><strong/><em/></Trans>
      },
      focus: () => ({
        locations: [
          { type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.LaughingGoblin },
          { type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.DancingDragon },
          { type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.ShiningHorse }
        ],
        scale: 0.4
      })
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 4 }}><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.LaughingGoblin }],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.Coin4).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.LaughingGoblin
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin4).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 0 }}><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.DancingDragon }],
        materials: [this.material(game, MaterialType.Coin).id(Coin.Coin0).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.DancingDragon
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin0).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: -30, y: 0 },
        text: () => <Trans defaults="tuto.coin.other"><strong/><em/></Trans>
      },
      focus: game => ({
        staticItems: [
          { type: MaterialType.PlayerBoard, item: { id: opponent, location: { id: opponent, type: LocationType.Table, player: opponent } } }
        ],
        materials: [this.material(game, MaterialType.Coin).player(opponent)],
        scale: 0.4
      })
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.LaughingGoblin
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin5).player(opponent).getIndex()
      },
      focus: game => this.steps[game.tutorial!.step - 1].focus!(game)
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.DancingDragon
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin2).player(opponent).getIndex()
      },
      focus: game => this.steps[game.tutorial!.step - 2].focus!(game)
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.Coin)(move)
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin0).player(opponent).getIndex()
          && move.location.id === PlayerBoardSpace.ShiningHorse
      },
      focus: game => this.steps[game.tutorial!.step - 3].focus!(game)
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.Coin)(move)
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin3).player(opponent).getIndex()
          && move.location.id === PlayerBoardSpace.Pouch1
      },
      focus: game => this.steps[game.tutorial!.step - 4].focus!(game)
    },
    {
      move: {
        player: opponent,
        filter: (move, game) => isMoveItemType(MaterialType.Coin)(move)
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin4).player(opponent).getIndex()
          && move.location.id === PlayerBoardSpace.Pouch2
      },
      focus: game => this.steps[game.tutorial!.step - 5].focus!(game)
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 2 }}><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.ShiningHorse }],
        materials: [this.material(game, MaterialType.Coin).id(Coin.Coin2).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.ShiningHorse
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin2).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.pouch"><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [
          { type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.Pouch1 },
          { type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.Pouch2 }
        ],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && (move.location.id === PlayerBoardSpace.Pouch1 || move.location.id === PlayerBoardSpace.Pouch2)
          && this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me).getIndexes().includes(move.itemIndex)
      }
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.pouch"><strong/><em/></Trans>
      },
      focus: game => this.steps[game.tutorial!.step - 1].focus!(game),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && (move.location.id === PlayerBoardSpace.Pouch1 || move.location.id === PlayerBoardSpace.Pouch2)
          && this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me).getIndexes().includes(move.itemIndex)
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.resolution.1"><strong/><em/></Trans>
      },
      focus: game => ({
        materials: [this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.LaughingGoblin)],
        margin: { left: 5, right: 5 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.revealed"><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [],
        materials: [
          this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.LaughingGoblin),
          this.material(game, MaterialType.Card).location(LocationType.Tavern).locationId(Tavern.LaughingGoblin)
        ]
      })
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
      focus: game => ({
        materials: [this.material(game, MaterialType.Card).player(opponent).location(LocationType.Army).id<CardId>(id => id.front === Card.WarriorGrade3_1)],
        scale: 0.4
      })
    },
    {
      popup: {
        position: { x: 0, y: 10 },
        text: () => <Trans defaults="tuto.hunter.me"><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.Army, player: me, id: DwarfType.Hunter }],
        materials: [this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.Hunter1)]
      }),
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
      focus: game => ({
        materials: [
          this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.DancingDragon),
          this.material(game, MaterialType.Card).location(LocationType.Tavern).locationId(Tavern.DancingDragon)
        ],
        margin: { left: 5, bottom: 5, right: 5 }
      })
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
        position: { x: 10, y: 0 },
        text: () => <Trans defaults="tuto.miner.me"><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.Army, player: me, id: DwarfType.Miner }],
        materials: [this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.MinerGrade0_1)],
        margin: { top: 3 }
      }),
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.MinerGrade0_1).getIndex(),
        interrupt: isMoveItemType(MaterialType.Coin)
      }
    },
    {
      popup: {
        position: { x: 20, y: 0 },
        text: () => <Trans defaults="tuto.exchange-coin"><strong/><em/></Trans>
      },
      focus: game => ({
        materials: [
          this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).player(me)
            .locationId((id) => id! > PlayerBoardSpace.ShiningHorse || id === PlayerBoardSpace.DancingDragon)
        ],
        scale: 0.5
      })
    },
    {
      popup: {
        position: { x: 20, y: 0 },
        text: () => <Trans defaults="tuto.exchange"><strong/><em/></Trans>
      },
      focus: game => ({
        materials: [
          this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).player(me)
            .locationId((id) => id! > PlayerBoardSpace.ShiningHorse || id === PlayerBoardSpace.DancingDragon),
          this.material(game, MaterialType.Coin).id(Coin.GoldCoin8)
        ],
        margin: { top: 3 }
      }),
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.resolution.3"><strong/><em/></Trans>
      },
      focus: game => ({
        materials: [
          this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.ShiningHorse),
          this.material(game, MaterialType.Card).location(LocationType.Tavern).locationId(Tavern.ShiningHorse)
        ],
        margin: { left: 3, right: 3, bottom: 3, top: 3 }
      })
    },
    {
      popup: {
        position: { x: 20, y: 10 },
        text: () => <Trans defaults="tuto.royal-offering.me"><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.Discard, id: MaterialType.Card }],
        materials: [this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.RoyalOffering3)],
        scale: 0.5
      }),
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move)
          && move.itemIndex === this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.RoyalOffering3).getIndex()
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.transform"><strong/><em/></Trans>
      },
      focus: game => ({
        materials: [
          this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).player(me).id(Coin.Coin2),
          this.material(game, MaterialType.Card).location(LocationType.Discard).id<CardId>(id => id.front === Card.RoyalOffering3),
          this.material(game, MaterialType.Coin).id(Coin.GoldCoin5)
        ],
        margin: { top: 2, left: 2, bottom: 2, right: 2 }
      }),
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
        position: { x: 35, y: 10 },
        text: () => <Trans defaults="tuto.endturn.1"><strong/><em/></Trans>
      },
      focus: game => ({
        materials: [this.material(game, MaterialType.Card).location(LocationType.Tavern)],
        margin: { top: 1, bottom: 1, right: 25 }
      })
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 8 }}><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.LaughingGoblin }],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.GoldCoin8).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.LaughingGoblin
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.GoldCoin8).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 5 }}><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.DancingDragon }],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.GoldCoin5).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.DancingDragon
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.GoldCoin5).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => <Trans defaults="tuto.coin" values={{ coin: 3 }}><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.ShiningHorse }],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.Coin3).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.ShiningHorse
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin3).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => <Trans defaults="tuto.pouch"><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [
          { type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.Pouch1 },
          { type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.Pouch2 }
        ],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && (move.location.id === PlayerBoardSpace.Pouch1 || move.location.id === PlayerBoardSpace.Pouch2)
          && this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me).getIndexes().includes(move.itemIndex)
      }
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => <Trans defaults="tuto.pouch"><strong/><em/></Trans>
      },
      focus: game => this.steps[game.tutorial!.step - 1].focus!(game),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && (move.location.id === PlayerBoardSpace.Pouch1 || move.location.id === PlayerBoardSpace.Pouch2)
          && this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me).getIndexes().includes(move.itemIndex)
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.LaughingGoblin
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin3).player(opponent).getIndex()
      }
    },

    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.DancingDragon
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin5).player(opponent).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.ShiningHorse
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.GoldCoin7).player(opponent).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.Pouch1
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin2).player(opponent).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move)
          && move.location.id === PlayerBoardSpace.Pouch2
          && move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin0).player(opponent).getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 20 },
        text: () => <Trans defaults="tuto.blacksmith.me"><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.Army, player: me, id: DwarfType.Blacksmith }],
        materials: [this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.Blacksmith1)]
      }),
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
      focus: game => ({
        materials: [
          this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.DancingDragon)
        ],
        margin: { left: 2, right: 2 }
      })
    },
    {
      popup: {
        position: { x: 0, y: 20 },
        text: () => <Trans defaults="tuto.gem"><strong/><em/></Trans>
      },
      focus: game => ({
        materials: [
          this.material(game, MaterialType.Gem).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.Gem)
        ],
        margin: { left: 2, right: 2 }
      })
    },
    {
      popup: {
        position: { x: 20, y: -10 },
        text: () => <Trans defaults="tuto.warrior.me"><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.Army, player: me, id: DwarfType.Warrior }],
        materials: [this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.WarriorGrade4_1)]
      }),
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
        position: { x: 20, y: -10 },
        text: () => <Trans defaults="tuto.explorer.me"><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [{ type: LocationType.Army, player: me, id: DwarfType.Explorer }],
        materials: [this.material(game, MaterialType.Card).location(LocationType.Tavern).id<CardId>(id => id.front === Card.ExplorerGrade11_1)]
      }),
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
      focus: game => ({
        locations: this.material(game, MaterialType.Card).location(LocationType.Army).player(me).getIndexes().map(card => (
          { type: LocationType.Grade, parent: card }
        ))
      })
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => <Trans defaults="tuto.recruitment"><strong/><em/></Trans>
      },
      focus: game => this.steps[game.tutorial!.step - 1].focus!(game)
    },
    {
      popup: {
        position: { x: 0, y: 35 },
        text: () => <Trans defaults="tuto.heroes"><strong/><em/></Trans>
      },
      focus: game => ({
        materials: [this.material(game, MaterialType.Card).location(LocationType.HeroesDeck)],
        scale: 0.45
      })
    },
    {
      popup: {
        position: { x: 0, y: 15 },
        text: () => <Trans defaults="tuto.aral"><strong/><em/></Trans>
      },
      focus: game => ({
        locations: [this.location(LocationType.Army).player(me).id(DwarfType.Hunter).location],
        materials: [this.material(game, MaterialType.Card).location(LocationType.HeroesDeck).id<CardId>(id => id.front === Card.Aral)]
      }),
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
      focus: game => ({
        materials: [this.material(game, MaterialType.Card).location(LocationType.Age1Deck)],
        scale: 0.6
      })
    },
    {
      popup: {
        position: { x: -30, y: 0 },
        text: () => <Trans defaults="tuto.distinctions"><strong/><em/></Trans>
      },
      focus: game => ({
        materials: [this.material(game, MaterialType.Distinction).location(LocationType.DistinctionsDeck)],
        margin: { left: 20 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.endage.1"><strong/><em/></Trans>
      },
      focus: game => ({
        materials: [this.material(game, MaterialType.Card).location(LocationType.Age2Deck).sort(item => -item.location.x!).limit(10)],
        scale: 0.6
      })
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