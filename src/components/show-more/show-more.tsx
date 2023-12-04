import {incMoreCounter} from '../../store/action.ts';
import {useAppDispatch} from '../../hooks/redux-typed-hooks.ts';


export const ShowMore = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={() => dispatch(incMoreCounter())}>Show more</button>
    </div>
  );
};
