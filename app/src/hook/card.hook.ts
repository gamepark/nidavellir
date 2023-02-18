import { LocatedCard } from '@gamepark/nidavellir/state/LocatedCard';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { useMemo } from 'react';
import mapValues from 'lodash/mapValues';
import groupBy from 'lodash/groupBy';

export const useCardDecksSize = (cards: (LocatedCard | SecretCard)[]) =>
  useMemo(
    () =>
      mapValues(
        groupBy(cards, (c) => c.location.type),
        (list) => list.length
      ),
    [cards]
  );
