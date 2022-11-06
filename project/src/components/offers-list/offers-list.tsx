import { useState } from 'react';
import { Offers } from '../../types/offers';
import Card from '../card/card';

type Props = {
  offers: Offers;
  listClass?: string;
  cardClass?: string;
}

function OffersList(props: Props) {
  const [, setIsActive] = useState<number>(-1);

  return (
    <div className={`places__list ${props.listClass || ''}`}>
      {props.offers.map((offer) => (
        <Card
          offer={offer}
          key={offer.id}
          onCardHover={setIsActive}
          cardClass={props.cardClass}
        />
      ))}
    </div>
  );
}

export default OffersList;
