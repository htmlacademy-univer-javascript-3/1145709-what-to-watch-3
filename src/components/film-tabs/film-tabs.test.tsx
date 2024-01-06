import {render, screen} from '@testing-library/react';

import {expect} from 'vitest';

import {withHistory} from '../../utils/mock-component.tsx';
import userEvent from '@testing-library/user-event';
import {DescriptionType} from '../../const.ts';
import {createMemoryHistory, MemoryHistory} from 'history';
import FilmTabs, {FilmTypes} from './film-tabs.tsx';

describe('Component: FilmTabs', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<FilmTabs selectedKey={DescriptionType.Overview}/>, mockHistory);
    render(withHistoryComponent);

    FilmTypes.forEach((type) => expect(screen.getByText(type.text)).toBeInTheDocument());
  });

  it('should correctly handle click on tabs', async () => {
    const withStoreComponent = withHistory(<FilmTabs selectedKey={DescriptionType.Reviews}/>, mockHistory);
    mockHistory.push('/');
    render(withStoreComponent);

    for (const type of FilmTypes) {
      const tab = screen.getByTestId(type.key);

      await userEvent.click(tab);

      expect(mockHistory.location.search.substring(1)).toEqual(type.params);
    }
  });
});
