import MainPage from '../../pages/main-page/main-page';

type Props = {
  offerCount: number;
}

function App({ offerCount }: Props): JSX.Element {
  return <MainPage offerCount={offerCount} />;
}

export default App;
