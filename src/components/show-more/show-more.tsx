import {DefaultMoreCounterValue} from '../../const.ts';

interface ShowMoreProps {
  addMoreCounter: (count: number) => void;
}

export const ShowMore = (props: ShowMoreProps) => (
  <div className="catalog__more">
    <button className="catalog__button" type="button" onClick={() => props.addMoreCounter(DefaultMoreCounterValue)}>Show more</button>
  </div>
);
