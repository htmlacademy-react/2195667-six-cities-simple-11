import PageWrapper from '../../components/page-wrapper/page-wrapper';
import Tabs from '../../components/tabs/tabs';
import { CITY_LIST } from '../../const';

function NoResultsPage(): JSX.Element {
  return (
    <PageWrapper pageClass="page--gray page--main">
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Cities</h1>
        <Tabs cities={CITY_LIST} />
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in
                  Dusseldorf
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}

export default NoResultsPage;
