import { Link } from 'react-router-dom';
import PageWrapper from '../../components/page-wrapper/page-wrapper';
import { AppRoute } from '../../const';

function NotFoundPage() {
  return (
    <PageWrapper pageClass="page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">404</h1>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <b className="places__found">404. Page not found</b>
              <Link to={AppRoute.Main}>Back to main page</Link>
            </section>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}

export default NotFoundPage;
