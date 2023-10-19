import Article from '../../components/article/article.tsx';

interface MainScreenProps {
  promoFilmName: string;
  promoFilmGenre: string;
  promoFilmReleaseDate: Date;
}

function MainPage(props: MainScreenProps): JSX.Element {
  const {promoFilmName, promoFilmGenre, promoFilmReleaseDate} = props;

  return (
    <>
      <head>
        <meta charSet="UTF-8"/>
        <title>WTW</title>
        <meta name="robots" content="noindex, nofollow"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="stylesheet" href="css/main.min.css"/>
      </head>

      <body>
        <section className="film-card">
          <div className="film-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

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
                  <button className="btn btn--play film-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list film-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                    <span className="film-card__count">9</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <ul className="catalog__genres-list">
              <li className="catalog__genres-item catalog__genres-item--active">
                <a href="#" className="catalog__genres-link">All genres</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Comedies</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Crime</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Documentary</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Dramas</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Horror</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Kids & Family</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Romance</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Sci-Fi</a>
              </li>
              <li className="catalog__genres-item">
                <a href="#" className="catalog__genres-link">Thrillers</a>
              </li>
            </ul>

            <div className="catalog__films-list">
              <Article imageSrc={'img/fantastic-beasts-the-crimes-of-grindelwald.jpg'} linkText={'Fantastic Beasts: The Crimes of Grindelwald'}/>
              <Article imageSrc={'img/bohemian-rhapsody.jpg'} linkText={'Bohemian Rhapsody'}/>
              <Article imageSrc={'img/macbeth.jpg'} linkText={'Macbeth'}/>
              <Article imageSrc={'img/aviator.jpg'} linkText={'Aviator'}/>
              <Article imageSrc={'img/we-need-to-talk-about-kevin.jpg'} linkText={'We need to talk about Kevin'}/>
              <Article imageSrc={'img/what-we-do-in-the-shadows.jpg'} linkText={'What We Do in the Shadows'}/>
              <Article imageSrc={'img/revenant.jpg'} linkText={'Revenant'}/>
              <Article imageSrc={'img/johnny-english.jpg'} linkText={'Johnny English'}/>
              <Article imageSrc={'img/shutter-island.jpg'} linkText={'Shutter Island'}/>
              <Article imageSrc={'img/pulp-fiction.jpg'} linkText={'Pulp Fiction'}/>
              <Article imageSrc={'img/no-country-for-old-men.jpg'} linkText={'No Country for Old Men'}/>
              <Article imageSrc={'img/snatch.jpg'} linkText={'Snatch'}/>
              <Article imageSrc={'img/moonrise-kingdom.jpg'} linkText={'Moonrise Kingdom'}/>
              <Article imageSrc={'img/seven-years-in-tibet.jpg'} linkText={'Seven Years in Tibet'}/>
              <Article imageSrc={'img/midnight-special.jpg'} linkText={'Midnight Special'}/>
              <Article imageSrc={'img/war-of-the-worlds.jpg'} linkText={'War of the Worlds'}/>
              <Article imageSrc={'img/dardjeeling-limited.jpg'} linkText={'Dardjeeling Limited'}/>
              <Article imageSrc={'img/orlando.jpg'} linkText={'Orlando'}/>
              <Article imageSrc={'img/mindhunter.jpg'} linkText={'Mindhunter'}/>
              <Article imageSrc={'img/midnight-special.jpg'} linkText={'Midnight Special'}/>
            </div>

            <div className="catalog__more">
              <button className="catalog__button" type="button">Show more</button>
            </div>
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </body>
    </>
  );
}

export default MainPage;
