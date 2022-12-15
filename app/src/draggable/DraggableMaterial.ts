export enum DraggableMaterial {
  Coin = 'Coin',
  Card = 'Card',
}

export type DraggableCoin = {
  type: typeof DraggableMaterial.Coin;
  id: number;
};

export function draggableCoin(id: number): DraggableCoin {
  return {
    type: DraggableMaterial.Coin,
    id,
  };
}
