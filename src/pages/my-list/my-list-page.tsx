import {Films} from '../../types/film';
import {FilmList} from '../../components/film-list/film-list';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';

interface MyListPageProps {
  films: Films;
}

function MyListPage(props: MyListPageProps): JSX.Element {
  const {films} = props;

  return (
    <div className="user-page">
      <Header/>
      <FilmList films={films} title={'Catalog'}/>
      <Footer/>
    </div>
  );
}

export default MyListPage;
