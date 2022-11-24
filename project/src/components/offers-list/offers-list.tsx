import { Offers } from '../../types/offers';
import Card from '../card/card';

type Props = {
  offers: Offers;
  listClass?: string;
  cardClass?: string;
  onActiveChange?: (id: number) => void;
}

function OffersList(props: Props): JSX.Element {
  return (
    <div className={`places__list ${props.listClass || ''}`}>
      {props.offers.map((offer) => (
        <Card
          offer={offer}
          key={offer.id}
          onCardHover={props.onActiveChange}
          cardClass={props.cardClass}
        />
      ))}
    </div>
  );
}

export default OffersList;
