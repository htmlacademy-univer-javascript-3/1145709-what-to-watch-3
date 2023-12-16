import {FilmList} from '../../components/film-list/film-list';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {MyListButton} from '../../components/my-list-button/my-list-button.tsx';
import {PlayButton} from '../../components/play-button/play-button.tsx';
import {LoadingMessage} from '../../components/loading-messsage/loading-message.tsx';

function MainPage(): JSX.Element {
  const promoFilm = useAppSelector((state) => state.main.promoFilm);
  const films = useAppSelector((state) => state.main.films);

  if (promoFilm === null){
    return <LoadingMessage/>;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.name} width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton id={promoFilm.id}/>
                <MyListButton/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <FilmList
          films={films}
          title={'Catalog'}
        />
        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
