import { useEffect, useState } from 'react';
import Filter from '../../components/filter/filter';
import Map from '../../components/map/map';
import NoResultsPage from '../../components/no-results-page/no-results-page';
import OffersList from '../../components/offers-list/offers-list';
import PageWrapper from '../../components/page-wrapper/page-wrapper';
import Tabs from '../../components/tabs/tabs';
import { CITY_LIST, Sort } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOfferList } from '../../store/action';
import { City } from '../../types/cities';
import { Point } from '../../types/map';
import { Offers } from '../../types/offers';
import LoadingScreen from '../loading-screen/loading-screen';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state) => state.city);
  const sorting = useAppSelector((state) => state.sorting);
  const isDataLoading = useAppSelector((state) => state.loading);
  const offers: Offers = useAppSelector((state) => state.offers).filter(
    (offer) => offer.city.name === activeCity
  );

  const [city, setCity] = useState<City>({
    name: 'Paris',
    location: { latitude: 48.85661, longitude: 2.351499, zoom: 13 }
  });
  const [selectedPoint, setSelectedPoint] = useState<Point | undefined>(
    undefined
  );
  const noResults = !offers || !offers.length;

  const onActiveChange = (id: number): void => {
    const point =
      id > 0 ? offers?.find((offer) => offer.id === id)?.location : undefined;
    setSelectedPoint(point);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchOfferList());
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && offers?.length) {
      setCity(offers[0].city);
    }
    return () => {
      isMounted = false;
    };
  }, [offers]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      sortOffers(sorting);
    }
    return () => {
      isMounted = false;
    };
  }, [activeCity, sorting]);

  const sortOffers = (sort: string) => {
    if (offers && offers.length) {
      const sortedArray: Offers = offers.sort((offer1, offer2) => {
        if (sort === Sort.PriceASC) {
          return offer1.price - offer2.price;
        } else if (sort === Sort.PriceDESC) {
          return offer2.price - offer1.price;
        } else if (sort === Sort.RateDESC) {
          return offer2.rating - offer1.rating;
        } else {
          return 0;
        }
      });

      return sortedArray;
    }
  };

  sortOffers(sorting);

  if (isDataLoading) {
    return <LoadingScreen />;
  }

  return (
    <PageWrapper pageClass="page--gray page--main">
      <main
        className={`page__main page__main--index ${
          noResults ? 'page__main--index-empty' : ''
        }`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={CITY_LIST} />
        <div className="cities">
          {offers && offers.length ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offers.length} places to stay in {activeCity}
                </b>
                <Filter sorting={sorting} />
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
          ) : (
            <NoResultsPage activeCity={activeCity} />
          )}
        </div>
      </main>
    </PageWrapper>
  );
}

export default MainPage;
