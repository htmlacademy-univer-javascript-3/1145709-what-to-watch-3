import {useDispatch} from 'react-redux';
import {incMoreCounter} from '../../store/action.ts';


export const ShowMore = () => {
  const dispatch = useDispatch();

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => dispatch(incMoreCounter())}>Show more</button>
    </div>
  );
};
