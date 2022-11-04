import { useState } from 'react';
import { Offers } from '../../types/offers';
import Card from '../card/card';

type Props = {
  offers: Offers;
}

function OffersList(props: Props) {
  const [, setIsActive] = useState<number>(-1);

  return (
    <div className="cities__places-list places__list tabs__content">
      {props.offers.map((offer) => (
        <Card offer={offer} key={offer.id} onCardHover={setIsActive} />
      ))}
    </div>
  );
}

export default OffersList;
