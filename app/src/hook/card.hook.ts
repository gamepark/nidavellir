import { LocatedCard } from '@gamepark/nidavellir/state/LocatedCard';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { useMemo } from 'react';
import mapValues from 'lodash/mapValues';
import groupBy from 'lodash/groupBy';
import { LocationType } from '@gamepark/nidavellir/state/Location';

export const useCardDecksSize = (cards: (LocatedCard | SecretCard)[]) => {
  const withPlayerLocations = useMemo(() => [LocationType.PlayerHand, LocationType.Army, LocationType.CommandZone], []);
  return useMemo(
    () =>
      mapValues(
        groupBy(cards, (c) => c.location.type),
        (value, key) =>
          withPlayerLocations.includes(+key)
            ? mapValues(
                groupBy(value, (c) => (c.location as any).player),
                (list) => list.length
              )
            : value.length
      ),
    [withPlayerLocations, cards]
  );
};
