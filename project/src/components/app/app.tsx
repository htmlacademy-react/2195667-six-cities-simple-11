import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PlacePage from '../../pages/place-page/place-page';
import { Offers } from '../../types/offers';

type Props = {
  offerCount: number;
  offers: Offers;
}

function App({ offerCount, offers }: Props): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage offerCount={offerCount} offers={offers} />}
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Room} element={<PlacePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
