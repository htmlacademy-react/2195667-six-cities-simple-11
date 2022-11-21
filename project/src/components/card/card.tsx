import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Offer } from '../../types/offers';

type Props = {
  offer: Offer;
  cardClass?: string;
  onCardHover?: (offerId: number) => void;
}

function Card(props: Props): JSX.Element {
  const { offer, cardClass } = props;
  const offerPath = generatePath(AppRoute.Room, { id: String(offer.id) });

  const onCardHover = (id: number) => {
    if (props.onCardHover) {
      props.onCardHover(id);
    }
  };

  return (
    <article
      className={`${cardClass || ''}__card place-card`}
      onMouseEnter={() => onCardHover(offer.id)}
      onMouseLeave={() => onCardHover(-1)}
      id={String(offer.id)}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={`${
          cardClass || ''
        }__image-wrapper place-card__image-wrapper`}
      >
        <Link to={offerPath}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt="City card"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating * 100) / 5}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerPath}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default Card;
