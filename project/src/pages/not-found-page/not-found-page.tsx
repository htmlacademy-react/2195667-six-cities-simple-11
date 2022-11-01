import PageWrapper from '../../components/page-wrapper/page-wrapper';

function NotFoundPage() {
  return (
    <PageWrapper pageClass="page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">404</h1>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <b className="places__found">404. Page not found</b>
            </section>
          </div>
        </div>
      </main>
    </PageWrapper>
  );
}

export default NotFoundPage;
