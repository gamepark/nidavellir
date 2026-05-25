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

  players = [
    { id: 1 },
    {
      id: 2,
      name: 'Gimli',
      avatar: {
        facialHairType: FacialHairType.BeardMajestic,
        topType: TopType.WinterHat1,
        eyebrowType: EyebrowType.AngryNatural,
        clotheType: ClotheType.Overall,
        clotheColor: '#964B00'
      }
    }
  ]

  steps: TutorialStep[] = [
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.start" defaults="Welcome to <0>Nidavellir</0>'s tutorial!">
            <strong />
            <em />
          </Trans>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.intro"
            defaults="In this game, you play a <0>Elvaland</0> commissioned by the <0>King of the Dwarves</0> to form an army capable of defeating the infamous <0>Fafnir</0>!"
          >
            <strong />
            <em />
          </Trans>
        )
      }
    },
    {
      popup: {
        position: { x: 40, y: 10 },
        text: () => (
          <Trans i18nKey="tuto.tavern" defaults="Here are some dwarves to recruit! They can be found in the <0>3 taverns</0> of the kingdom.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.Tavern }],
        materials: [this.material(game, MaterialType.Card).location(LocationType.Tavern)],
        margin: { right: 30 }
      })
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => (
          <Trans i18nKey="tuto.tresor" defaults="And there's your treasure. Thanks to these coins, you'll be able to convince the best dwarves to join you!">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me)],
        scale: 0.4
      })
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => (
          <Trans i18nKey="tuto.bid" defaults="Each round begins with the <0>Bids</0>: you must place 3 coins on the 3 taverns.">
            <strong />
            <em />
          </Trans>
        )
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
        text: () => (
          <Trans i18nKey="tuto.coin" defaults="Place your coin of value {coin} here." values={{ coin: 4 }}>
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.LaughingGoblin }],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.Coin4).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.LaughingGoblin &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin4).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => (
          <Trans i18nKey="tuto.coin" defaults="Place your coin of value {coin} here." values={{ coin: 0 }}>
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.DancingDragon }],
        materials: [this.material(game, MaterialType.Coin).id(Coin.Coin0).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.DancingDragon &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin0).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: -30, y: 0 },
        text: () => (
          <Trans i18nKey="tuto.coin.other" defaults="Your opponent places his pieces at the same time as you.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        staticItems: [{ type: MaterialType.PlayerBoard, item: { id: opponent, location: { id: opponent, type: LocationType.Table, player: opponent } } }],
        materials: [this.material(game, MaterialType.Coin).player(opponent)],
        scale: 0.4
      })
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.LaughingGoblin &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin5).player(opponent).getIndex()
      },
      focus: (game, context) => this.steps[game.tutorial!.step - 1].focus!(game, context)
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.DancingDragon &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin2).player(opponent).getIndex()
      },
      focus: (game, context) => this.steps[game.tutorial!.step - 2].focus!(game, context)
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin0).player(opponent).getIndex() &&
          move.location.id === PlayerBoardSpace.ShiningHorse
      },
      focus: (game, context) => this.steps[game.tutorial!.step - 3].focus!(game, context)
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin3).player(opponent).getIndex() &&
          move.location.id === PlayerBoardSpace.Pouch1
      },
      focus: (game, context) => this.steps[game.tutorial!.step - 4].focus!(game, context)
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin4).player(opponent).getIndex() &&
          move.location.id === PlayerBoardSpace.Pouch2
      },
      focus: (game, context) => this.steps[game.tutorial!.step - 5].focus!(game, context)
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => (
          <Trans i18nKey="tuto.coin" defaults="Place your coin of value {coin} here." values={{ coin: 2 }}>
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.ShiningHorse }],
        materials: [this.material(game, MaterialType.Coin).id(Coin.Coin2).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.ShiningHorse &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin2).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => (
          <Trans i18nKey="tuto.pouch" defaults="Place the last two coins in your pouch.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [
          { type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.Pouch1 },
          { type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.Pouch2 }
        ],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          (move.location.id === PlayerBoardSpace.Pouch1 || move.location.id === PlayerBoardSpace.Pouch2) &&
          this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me).getIndexes().includes(move.itemIndex)
      }
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => (
          <Trans i18nKey="tuto.pouch" defaults="Place the last two coins in your pouch.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game, context) => this.steps[game.tutorial!.step - 1].focus!(game, context),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          (move.location.id === PlayerBoardSpace.Pouch1 || move.location.id === PlayerBoardSpace.Pouch2) &&
          this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me).getIndexes().includes(move.itemIndex)
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.resolution.1"
            defaults="Once all players have placed their bets, the taverns are resolved, starting with the <0>Laughing Goblin</0> tavern."
          >
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.LaughingGoblin)],
        margin: { left: 5, right: 5 }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.revealed" defaults="The coins bet on this tavern are revealed, and the player who bet the highest-value coin recruits first!">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
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
          return (
            isMoveItemType(MaterialType.Card)(move) &&
            move.itemIndex ===
              this.material(game, MaterialType.Card)
                .location(LocationType.Tavern)
                .id<CardId>((id) => id.front === Card.WarriorGrade3_1)
                .getIndex()
          )
        }
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.warrior" defaults="Your opponent has recruited this warrior.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card)
            .player(opponent)
            .location(LocationType.Army)
            .id<CardId>((id) => id.front === Card.WarriorGrade3_1)
        ],
        scale: 0.4
      })
    },
    {
      popup: {
        position: { x: 0, y: 10 },
        text: () => (
          <Trans i18nKey="tuto.hunter.me" defaults="Recruit this Huntress.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.Army, player: me, id: DwarfType.Hunter }],
        materials: [
          this.material(game, MaterialType.Card)
            .location(LocationType.Tavern)
            .id<CardId>((id) => id.front === Card.Hunter1)
        ]
      }),
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex ===
            this.material(game, MaterialType.Card)
              .location(LocationType.Tavern)
              .id<CardId>((id) => id.front === Card.Hunter1)
              .getIndex()
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.resolution.2" defaults="After each player has recruited a dwarf, we solve the following tavern.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
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
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex !==
            this.material(game, MaterialType.Card)
              .location(LocationType.Tavern)
              .id<CardId>((id) => id.front === Card.MinerGrade0_1)
              .getIndex()
      }
    },
    {
      popup: {
        position: { x: 10, y: 0 },
        text: () => (
          <Trans i18nKey="tuto.miner.me" defaults="Recruit this Miner.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.Army, player: me, id: DwarfType.Miner }],
        materials: [
          this.material(game, MaterialType.Card)
            .location(LocationType.Tavern)
            .id<CardId>((id) => id.front === Card.MinerGrade0_1)
        ],
        margin: { top: 3 }
      }),
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex ===
            this.material(game, MaterialType.Card)
              .location(LocationType.Tavern)
              .id<CardId>((id) => id.front === Card.MinerGrade0_1)
              .getIndex(),
        interrupt: isMoveItemType(MaterialType.Coin)
      }
    },
    {
      popup: {
        position: { x: 20, y: 0 },
        text: () => (
          <Trans
            i18nKey="tuto.exchange-coin"
            defaults="You've played your 0-value coin: in addition to recruiting a dwarf, this coin allows you to exchange a coin from your purse for a higher-value coin!"
          >
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Coin)
            .location(LocationType.PlayerBoard)
            .player(me)
            .locationId((id) => (id as number) > PlayerBoardSpace.ShiningHorse || id === PlayerBoardSpace.DancingDragon)
        ],
        scale: 0.5
      })
    },
    {
      popup: {
        position: { x: 20, y: 0 },
        text: () => (
          <Trans
            i18nKey="tuto.exchange"
            defaults="In your pouch, face down, are coins worth 5 and 3. You must exchange <0>the highest of the 2</0> for a coin worth <0>the sum of the 2</0>. So you're going to exchange the 5-value coin for an 8-value coin from the treasure."
          >
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Coin)
            .location(LocationType.PlayerBoard)
            .player(me)
            .locationId((id) => (id as number) > PlayerBoardSpace.ShiningHorse || id === PlayerBoardSpace.DancingDragon),
          this.material(game, MaterialType.Coin).id(Coin.GoldCoin8)
        ],
        margin: { top: 3 }
      }),
      move: {}
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.resolution.3" defaults="Now it's time to resolve the last tavern. This time, you have the highest coin.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
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
        text: () => (
          <Trans
            i18nKey="tuto.royal-offering.me"
            defaults="This card is a <0>royal offer</0>. It allows you to immediately exchange a coin for a coin of value +3.\nChoose this card by clicking on it for 1 second."
          >
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.Discard, id: MaterialType.Card }],
        materials: [
          this.material(game, MaterialType.Card)
            .location(LocationType.Tavern)
            .id<CardId>((id) => id.front === Card.RoyalOffering3)
        ],
        scale: 0.5
      }),
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex ===
            this.material(game, MaterialType.Card)
              .location(LocationType.Tavern)
              .id<CardId>((id) => id.front === Card.RoyalOffering3)
              .getIndex()
      }
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.transform" defaults="Now click on your coin of value 2 to trade it for a coin of value 5.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).player(me).id(Coin.Coin2),
          this.material(game, MaterialType.Card)
            .location(LocationType.Discard)
            .id<CardId>((id) => id.front === Card.RoyalOffering3),
          this.material(game, MaterialType.Coin).id(Coin.GoldCoin5)
        ],
        margin: { top: 2, left: 2, bottom: 2, right: 2 }
      }),
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.itemIndex === this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).id(Coin.Coin2).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex ===
            this.material(game, MaterialType.Card)
              .location(LocationType.Tavern)
              .id<CardId>((id) => id.front === Card.MinerGrade1_1)
              .getIndex()
      }
    },
    {
      popup: {
        position: { x: 35, y: 10 },
        text: () => (
          <Trans i18nKey="tuto.endturn.1" defaults="The first round is over!\nAt the start of each round, the taverns fill up, and it's a new betting phase.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Card).location(LocationType.Tavern)],
        margin: { top: 1, bottom: 1, right: 25 }
      })
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => (
          <Trans i18nKey="tuto.coin" defaults="Place your coin of value {coin} here." values={{ coin: 8 }}>
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.LaughingGoblin }],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.GoldCoin8).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.LaughingGoblin &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.GoldCoin8).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => (
          <Trans i18nKey="tuto.coin" defaults="Place your coin of value {coin} here." values={{ coin: 5 }}>
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.DancingDragon }],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.GoldCoin5).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.DancingDragon &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.GoldCoin5).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => (
          <Trans i18nKey="tuto.coin" defaults="Place your coin of value {coin} here." values={{ coin: 3 }}>
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.ShiningHorse }],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).id(Coin.Coin3).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.ShiningHorse &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin3).player(me).getIndex()
      }
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => (
          <Trans i18nKey="tuto.pouch" defaults="Place the last two coins in your pouch.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [
          { type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.Pouch1 },
          { type: LocationType.PlayerBoard, player: me, id: PlayerBoardSpace.Pouch2 }
        ],
        materials: [this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me)],
        scale: 0.4
      }),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          (move.location.id === PlayerBoardSpace.Pouch1 || move.location.id === PlayerBoardSpace.Pouch2) &&
          this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me).getIndexes().includes(move.itemIndex)
      }
    },
    {
      popup: {
        position: { x: 5, y: 20 },
        text: () => (
          <Trans i18nKey="tuto.pouch" defaults="Place the last two coins in your pouch.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game, context) => this.steps[game.tutorial!.step - 1].focus!(game, context),
      move: {
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          (move.location.id === PlayerBoardSpace.Pouch1 || move.location.id === PlayerBoardSpace.Pouch2) &&
          this.material(game, MaterialType.Coin).location(LocationType.Hand).player(me).getIndexes().includes(move.itemIndex)
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.LaughingGoblin &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin3).player(opponent).getIndex()
      }
    },

    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.DancingDragon &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin5).player(opponent).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.ShiningHorse &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.GoldCoin7).player(opponent).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.Pouch1 &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin2).player(opponent).getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Coin)(move) &&
          move.location.id === PlayerBoardSpace.Pouch2 &&
          move.itemIndex === this.material(game, MaterialType.Coin).id(Coin.Coin0).player(opponent).getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 20 },
        text: () => (
          <Trans i18nKey="tuto.blacksmith.me" defaults="Recruit this Blacksmith.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.Army, player: me, id: DwarfType.Blacksmith }],
        materials: [
          this.material(game, MaterialType.Card)
            .location(LocationType.Tavern)
            .id<CardId>((id) => id.front === Card.Blacksmith1)
        ]
      }),
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex ===
            this.material(game, MaterialType.Card)
              .location(LocationType.Tavern)
              .id<CardId>((id) => id.front === Card.Blacksmith1)
              .getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex ===
            this.material(game, MaterialType.Card)
              .location(LocationType.Tavern)
              .id<CardId>((id) => id.front === Card.WarriorGrade6_1)
              .getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 20 },
        text: () => (
          <Trans i18nKey="tuto.tie" defaults="You played a coin of the same value as your opponent in the Dancing Dragon Tavern!">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Coin).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.DancingDragon)],
        margin: { left: 2, right: 2 }
      })
    },
    {
      popup: {
        position: { x: 0, y: 20 },
        text: () => (
          <Trans
            i18nKey="tuto.gem"
            defaults="In the event of a tie, these <0>gems</0> determine who wins. You have the most valuable gem, so you can recruit first!\nBut beware: <0>after recruiting, you'll exchange your gems</0>."
          >
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Gem).location(LocationType.PlayerBoard).locationId(PlayerBoardSpace.Gem)],
        margin: { left: 2, right: 2 }
      })
    },
    {
      popup: {
        position: { x: 20, y: -10 },
        text: () => (
          <Trans i18nKey="tuto.warrior.me" defaults="Recruit this Warrior.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.Army, player: me, id: DwarfType.Warrior }],
        materials: [
          this.material(game, MaterialType.Card)
            .location(LocationType.Tavern)
            .id<CardId>((id) => id.front === Card.WarriorGrade4_1)
        ]
      }),
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex ===
            this.material(game, MaterialType.Card)
              .location(LocationType.Tavern)
              .id<CardId>((id) => id.front === Card.WarriorGrade4_1)
              .getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex ===
            this.material(game, MaterialType.Card)
              .location(LocationType.Tavern)
              .id<CardId>((id) => id.front === Card.Blacksmith2)
              .getIndex()
      }
    },
    {
      move: {
        player: opponent,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex ===
            this.material(game, MaterialType.Card)
              .location(LocationType.Tavern)
              .id<CardId>((id) => id.front === Card.Hunter2)
              .getIndex()
      }
    },
    {
      popup: {
        position: { x: 20, y: -10 },
        text: () => (
          <Trans i18nKey="tuto.explorer.me" defaults="Recruit this Explorer.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [{ type: LocationType.Army, player: me, id: DwarfType.Explorer }],
        materials: [
          this.material(game, MaterialType.Card)
            .location(LocationType.Tavern)
            .id<CardId>((id) => id.front === Card.ExplorerGrade11_1)
        ]
      }),
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex ===
            this.material(game, MaterialType.Card)
              .location(LocationType.Tavern)
              .id<CardId>((id) => id.front === Card.ExplorerGrade11_1)
              .getIndex()
      }
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => (
          <Trans i18nKey="tuto.rank" defaults="Each dwarf has a rank here.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: this.material(game, MaterialType.Card)
          .location(LocationType.Army)
          .player(me)
          .getIndexes()
          .map((card) => ({ type: LocationType.Grade, parent: card }))
      })
    },
    {
      popup: {
        position: { x: 0, y: 30 },
        text: () => (
          <Trans
            i18nKey="tuto.recruitment"
            defaults="You have the right to <0>recruit a hero</0> as soon as you complete a line with <0>one rank of each Dwarf class</0>."
          >
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game, context) => this.steps[game.tutorial!.step - 1].focus!(game, context)
    },
    {
      popup: {
        position: { x: 0, y: 35 },
        text: () => (
          <Trans i18nKey="tuto.heroes" defaults="Meet the heroes. Every hero is unique.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Card).location(LocationType.HeroesDeck)],
        scale: 0.45
      })
    },
    {
      popup: {
        position: { x: 0, y: 15 },
        text: () => (
          <Trans i18nKey="tuto.aral" defaults="Recruit <0>Aral Eagle Claws</0>. This hunter-class hero has <0>2 ranks</0>.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        locations: [this.location(LocationType.Army).player(me).id(DwarfType.Hunter).location],
        materials: [
          this.material(game, MaterialType.Card)
            .location(LocationType.HeroesDeck)
            .id<CardId>((id) => id.front === Card.Aral)
        ]
      }),
      move: {
        player: me,
        filter: (move, game) =>
          isMoveItemType(MaterialType.Card)(move) &&
          move.itemIndex ===
            this.material(game, MaterialType.Card)
              .location(LocationType.HeroesDeck)
              .id<CardId>((id) => id.front === Card.Aral)
              .getIndex()
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.endturn.2"
            defaults="The second round is over!\nThis is the <0>Age I</0> deck, which is used to fill taverns. At the end of the turn when it's empty, <0>the King evaluates the troops and distributes distinctions.</0>"
          >
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Card).location(LocationType.Age1Deck)],
        scale: 0.6
      })
    },
    {
      popup: {
        position: { x: -30, y: 0 },
        text: () => (
          <Trans i18nKey="tuto.distinctions" defaults="Here are the awards. For each class, the player with the most ranks wins the corresponding distinction.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [this.material(game, MaterialType.Distinction).location(LocationType.DistinctionsDeck)],
        margin: { left: 20 }
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.endage.1" defaults="Once Age I has been completed, the tavern is filled with <0>the Age II deck</0>.">
            <strong />
            <em />
          </Trans>
        )
      },
      focus: (game) => ({
        materials: [
          this.material(game, MaterialType.Card)
            .location(LocationType.Age2Deck)
            .sort((item) => -item.location.x!)
            .limit(10)
        ],
        scale: 0.6
      })
    },
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.endgame" defaults="The game ends at the end of Age II.">
            <strong />
            <em />
          </Trans>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.score"
            defaults="The player with the most bravery points wins.\nEvery dwarf brings you bravery points, and your coins count too."
          >
            <strong />
            <em />
          </Trans>
        )
      }
    },
    {
      popup: {
        text: () => (
          <Trans
            i18nKey="tuto.go"
            defaults="Now it's your turn to play!\nTo find out what the dwarves, heroes and distinctions are doing, <0>just click on them</0>.\nGood luck, and be brave!"
          >
            <strong />
            <em />
          </Trans>
        )
      }
    }
  ]
}
