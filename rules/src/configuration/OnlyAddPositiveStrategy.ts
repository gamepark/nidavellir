import { Material, MaterialItem, PositiveSequenceStrategy } from '@gamepark/rules-api'

/**
 * This strategy help to maintain a consecutive sequence of numbers starting with 0 for items at the same location, for example a deck or a hand of cards
 */
export class OnlyAddPositiveStrategy extends PositiveSequenceStrategy {

  removeItem(_material: Material<number, number, number>, _item: MaterialItem<number, number>) {
    return;
  }
}