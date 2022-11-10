import { useState } from 'react';
import Map from '../../components/map/map';
import OffersList from '../../components/offers-list/offers-list';
import PageWrapper from '../../components/page-wrapper/page-wrapper';
import Tabs from '../../components/tabs/tabs';
import { CITY_LIST } from '../../const';
import { useAppSelector } from '../../hooks';
import { City } from '../../types/cities';
import { Point } from '../../types/map';
import { Offers } from '../../types/offers';

type Props = {
  offerCount: number;
  offers: Offers;
}

function MainPage({ offerCount, offers }: Props): JSX.Element {
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(
    undefined
  );
  const city: City = offers[0].city;
  const activeCity = useAppSelector((state) => state.city);

  const onActiveChange = (id: number) => {
    const point =
      id > 0 ? offers.find((offer) => offer.id === id)?.location : undefined;
    setSelectedPoint(point);
  };

  return (
    <PageWrapper pageClass="page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={CITY_LIST} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offerCount} places to stay in {activeCity}
              </b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li
                    className="places__option places__option--active"
                    tabIndex={0}
                  >
                    Popular
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: low to high
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Price: high to low
                  </li>
                  <li className="places__option" tabIndex={0}>
                    Top rated first
                  </li>
                </ul>
              </form>
              <OffersList
                offers={offers}
                listClass="cities__places-list tabs__content"
                cardClass="cities"
                onActiveChange={onActiveChange}
              />
            </section>
            <div
              className="cities__right-section"
              style={{ width: 'calc(100% - 572px)' }}
            >
              <Map
                selectedPoint={selectedPoint}
                offers={offers}
                city={city}
                mapClass="cities__map"
              />
            </div>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}

export default MainPage;
