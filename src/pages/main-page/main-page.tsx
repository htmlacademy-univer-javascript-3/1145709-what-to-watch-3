import {FilmList} from '../../components/film-list/film-list';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {StoreSchema} from '../../store/reducer.ts';
import {useEffect} from 'react';
import {filterFilmsByGenre} from '../../store/action.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {MyListButton} from '../../components/my-list-button/my-list-button.tsx';
import {PlayButton} from '../../components/play-button/play-button.tsx';

interface MainScreenProps {
  promoFilmName: string;
  promoFilmGenre: string;
  promoFilmReleaseDate: Date;
}

function MainPage(props: MainScreenProps): JSX.Element {
  const {promoFilmName, promoFilmGenre, promoFilmReleaseDate} = props;

  const filmsByGenre = useAppSelector((state: StoreSchema) => state.filmsByGenre);

  const currentGenre = useAppSelector((state: StoreSchema) => state.genre);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterFilmsByGenre());
  }, [dispatch, currentGenre]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header/>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218"
                height="327"
              />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilmName}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilmGenre}</span>
                <span className="film-card__year">{promoFilmReleaseDate.getFullYear()}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton/>
                <MyListButton/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <FilmList
          films={filmsByGenre}
          title={'Catalog'}
        />
        <Footer/>
      </div>
    </>
  );
}

export default MainPage;
