import FilmTabs from '../film-tabs/film-tabs';
import {Film} from '../../types/film';
import {useSearchParams} from 'react-router-dom';
import {DescriptionType} from '../../const';
import {DescOverview} from '../desc-overview/desc-overview';
import {DescDetails} from '../desc-details/desc-details';
import {DescReviews} from '../desc-reviews/desc-reviews';

interface FilmDescProps {
  film: Film;
}

function FilmDesc(props: FilmDescProps): JSX.Element {
  const getComponentByType = (type: DescriptionType, film: Film) => {
    switch (type) {
      case DescriptionType.Overview:
        return <DescOverview film={film}/>;
      case DescriptionType.Details:
        return <DescDetails film={film}/>;
      case DescriptionType.Reviews:
        return <DescReviews />;
      default:
        return undefined;
    }
  };

  const {film} = props;
  const [searchParams] = useSearchParams();
  const selectedKey = searchParams.get('tab') as DescriptionType || DescriptionType.Overview;

  return (
    <div className="film-card__wrap film-card__translate-top">
      <div className="film-card__info">
        <div className="film-card__poster film-card__poster--big">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327"/>
        </div>
        <div className="film-card__desc">
          <FilmTabs selectedKey={selectedKey}/>
          {getComponentByType(selectedKey, film)}
        </div>
      </div>
    </div>
  );
}

export default FilmDesc;
