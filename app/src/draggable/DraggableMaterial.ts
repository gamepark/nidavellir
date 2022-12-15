export enum DraggableMaterial {
  Coin = 'Coin',
  Card = 'Card',
  Hero = 'Hero',
}

export type DraggableCoin = {
  type: typeof DraggableMaterial.Coin;
  id: number;
};

export type DraggableCard = {
  type: typeof DraggableMaterial.Card;
  id: number;
};

export type DraggableHero = {
  type: typeof DraggableMaterial.Hero;
  id: number;
};

export const draggableCoin = (id: number): DraggableCoin => {
  return {
    type: DraggableMaterial.Coin,
    id,
  };
};

export const draggableCard = (id: number): DraggableCard => {
  return {
    type: DraggableMaterial.Card,
    id,
  };
};

export const draggableHero = (id: number): DraggableHero => {
  return {
    type: DraggableMaterial.Hero,
    id,
  };
};
