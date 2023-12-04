import {FilmList} from '../../components/film-list/film-list';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';

function MyListPage(): JSX.Element {
  return (
    <div className="user-page">
      <Header/>
      <FilmList films={[]} title={'Catalog'}/>
      <Footer/>
    </div>
  );
}

export default MyListPage;
