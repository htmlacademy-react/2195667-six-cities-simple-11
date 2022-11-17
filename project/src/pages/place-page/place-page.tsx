import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import PageWrapper from '../../components/page-wrapper/page-wrapper';
import ReviewForm from '../../components/review-form/review-form';
import ReviewList from '../../components/review-list/review-list';
import { useAppSelector } from '../../hooks';
import { comments } from '../../mocks/comments';
import { City } from '../../types/cities';
import { Point } from '../../types/map';
import { Offers } from '../../types/offers';
import { countRatingStars } from '../../utils/rating';
import NotFoundPage from '../not-found-page/not-found-page';

function PlacePage(): JSX.Element {
  const offers: Offers = useAppSelector((state) => state.offers);
  const { id } = useParams();
  const offersBeside = offers.slice(0, 3); // TODO: temp data
  const offer = offers.find((el) => String(el.id) === id);
  const commentList = comments;

  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(
    offer?.location
  );
  const onActiveChange = (offerId: number) => {
    const point =
      offerId > 0
        ? offers.find((offerItem) => offerItem.id === offerId)?.location
        : undefined;
    setSelectedPoint(point);
  };

  if (!offer) {
    return <NotFoundPage />;
  }

  const city: City = offer.city;

  return (
    <PageWrapper>
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.slice(0, 6).map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {offer.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{offer.title}</h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: countRatingStars(offer.rating) }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {offer.rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offer.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {offer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{offer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((item) => (
                    <li className="property__inside-item" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={offer.host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host"
                    />
                  </div>
                  <span className="property__user-name">{offer.host.name}</span>
                  {offer.host.isPro && (
                    <span className="property__user-status">Pro</span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">{offer.description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{commentList.length}</span>
                </h2>
                <ReviewList comments={commentList} />
                <ReviewForm />
              </section>
            </div>
          </div>

          <Map
            selectedPoint={selectedPoint}
            offers={offersBeside}
            city={city}
            mapClass="property__map"
          />
          <section className=" map" />
        </section>
        {offersBeside.length && (
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <OffersList
                offers={offersBeside}
                listClass="near-places__list"
                cardClass="near-places"
                onActiveChange={onActiveChange}
              />
            </section>
          </div>
        )}
      </main>
    </PageWrapper>
  );
}

export default PlacePage;
