import {LocatedCoin} from "../LocatedCoin";

export type SecretCoin = Omit<LocatedCoin, 'id'> & {
    id?: number;
};
