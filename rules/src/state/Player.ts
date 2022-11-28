export enum PlayerId {
  One = 1,
  Two,
  Three,
}

export type Player = {
  id: PlayerId;
  score: number;
  ready?: boolean;
  lastCard?: number;
  newCoin?: number;
};
