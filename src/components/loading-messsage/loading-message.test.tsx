import {createMemoryHistory, MemoryHistory} from 'history';
import {withHistory} from '../../utils/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import {LoadingMessage} from './loading-message.tsx';

vi.mock('../header/header.tsx', () => ({
  Header: () => <div data-testid="header">header</div>
}));

vi.mock('../footer/footer.tsx', () => ({
  Footer: () => <div data-testid="footer">footer</div>
}));
describe('Component: LoadingMessage', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<LoadingMessage />, mockHistory);
    render(withHistoryComponent);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
