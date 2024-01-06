import {withHistory} from '../../utils/mock-component.tsx';
import {createMemoryHistory, MemoryHistory} from 'history';
import {act, render, screen} from '@testing-library/react';

import {expect} from 'vitest';
import {AppRoute, DescriptionType} from '../../const.ts';
import FilmDesc from './film-desc.tsx';
import {film} from '../../mocks/film.ts';


vi.mock('../film-tabs/film-tabs', () => ({
  default: (props: {selectedKey: string}) => <div data-testid="film-tabs">film tabs with key {props.selectedKey}</div>
}));

vi.mock('../desc-overview/desc-overview', () => ({
  DescOverview: () => <div>desc overview</div>
}));

vi.mock('../desc-details/desc-details', () => ({
  DescDetails: () => <div>desc details</div>
}));

vi.mock('../desc-reviews/desc-reviews', () => ({
  DescReviews: () => <div>desc reviews</div>
}));

describe('Component: FilmDesc', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<FilmDesc film={film}/>, mockHistory);
    mockHistory.push(`${AppRoute.Films}/${film.id}`);

    render(withHistoryComponent);

    expect(screen.getByTestId('film-tabs')).toHaveTextContent('film tabs with key');
  });

  it('should correctly handle key', () => {
    const withHistoryComponent = withHistory(<FilmDesc film={film}/>, mockHistory);

    mockHistory.push(`${AppRoute.Films}/${film.id}?tab=${DescriptionType.Overview}`);
    render(withHistoryComponent);
    expect(screen.getByText('desc overview')).toBeInTheDocument();

    act(() => {
      mockHistory.push(`${AppRoute.Films}/${film.id}?tab=${DescriptionType.Reviews}`);
    });
    expect(screen.getByText('desc reviews')).toBeInTheDocument();

    act(() => {
      mockHistory.push(`${AppRoute.Films}/${film.id}?tab=${DescriptionType.Details}`);
    });
    expect(screen.getByText('desc details')).toBeInTheDocument();
  });
});
