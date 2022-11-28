import {LocatedCard} from "../LocatedCard";

export type SecretCard = Omit<LocatedCard, 'id'> & { id?: number };
