import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

interface PlayButtonProps {
  id: string;
}

export const PlayButton = (props: PlayButtonProps) => (
  <Link to={`${AppRoute.Player}/${props.id}`} className="btn btn--play film-card__button" type="button">
    <svg viewBox="0 0 19 19" width="19" height="19">
      <use xlinkHref="#play-s"></use>
    </svg>
    <span>Play</span>
  </Link>
);
