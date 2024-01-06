import {useNavigate} from 'react-router-dom';
import {DescriptionType} from '../../const';

type FilmTabType = {
  key: DescriptionType;
  text: string;
  params: string;
}

export const FilmTypes: Array<FilmTabType> = [
  {
    key: DescriptionType.Overview,
    text: 'Overview',
    params: 'tab=overview'
  },
  {
    key: DescriptionType.Details,
    text: 'Details',
    params: 'tab=details'
  },
  {
    key: DescriptionType.Reviews,
    text: 'Reviews',
    params: 'tab=reviews'
  },
];

interface FilmTabsProps {
  selectedKey: DescriptionType;
}

function FilmTabs(props: FilmTabsProps): JSX.Element {
  const {selectedKey} = props;
  const navigate = useNavigate();

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {FilmTypes.map((x) => (
          <li key={x.text} className={`film-nav__item ${selectedKey === x.key ? 'film-nav__item--active' : ''}`}>
            <div className='film-nav__link' data-testid={x.key} onClick={() => {
              navigate(`?${x.params}`);
            }}
            >
              {x.text}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FilmTabs;
