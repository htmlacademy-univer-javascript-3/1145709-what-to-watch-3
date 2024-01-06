import {FilmShallow} from '../../types/film-shallow.ts';
import {withHistory} from '../../utils/mock-component.tsx';
import FilmCard from './film-card.tsx';
import {createMemoryHistory, MemoryHistory} from 'history';
import {films} from '../../mocks/films.ts';
import {render, screen} from '@testing-library/react';

import {expect} from 'vitest';
import {AppRoute} from '../../const.ts';
import userEvent from '@testing-library/user-event';


const mockInput = vi.fn();
vi.mock('../video-player/video-player', () => ({
  default: (props: {film: FilmShallow}) => {
    mockInput(props);
    return <div data-testid="video-player">video player</div>;
  }
}));

describe('Component: FilmCard', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<FilmCard film={films[0]}/>, mockHistory);
    mockHistory.push('/');

    render(withHistoryComponent);

    expect(screen.getByTestId('film-link')).toBeInTheDocument();
  });

  it('should work on click', async () => {
    const withHistoryComponent = withHistory(<FilmCard film={films[0]}/>, mockHistory);
    mockHistory.push('/');

    render(withHistoryComponent);

    await userEvent.click(
      screen.getByTestId('film-link')
    );

    expect(mockHistory.location.pathname).toEqual(`${AppRoute.Films}/${films[0].id}`);
  });
});
