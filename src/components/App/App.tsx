import MainPage from '../../pages/MainPage/MainPage';

interface AppProps {
  promoFilmName: string;
  promoFilmGenre: string;
  promoFilmReleaseDate: Date;
}

function App(props: AppProps): JSX.Element {
  return (
    <MainPage {...props}/>
  );
}

export default App;
