import {createMemoryHistory, MemoryHistory} from 'history';
import {withHistory} from '../../utils/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import {Footer} from './footer.tsx';

describe('Component: FilmTabs', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<Footer />, mockHistory);
    render(withHistoryComponent);

    expect(screen.getByText('© 2023 What to watch Ltd.')).toBeInTheDocument();
  });
});
