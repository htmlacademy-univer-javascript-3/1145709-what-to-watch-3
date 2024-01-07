import {createMemoryHistory, MemoryHistory} from 'history';
import {Route, Routes} from 'react-router-dom';

import {render, screen} from '@testing-library/react';
import {PrivateRoute} from './private-route.tsx';
import {AuthorizationStatus} from '../../const.ts';
import {withHistory} from '../../utils/mock-component.tsx';

describe('Component: PrivateRoute', () => {
  let mockHistory: MemoryHistory;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    mockHistory.push('/mylist');
  });

  it('should render component for public route, when user not authorized', () => {
    const publicText = 'public route';
    const privateText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/login'} element={<span>{publicText}</span>} />
        <Route path={'/mylist'} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <span>{privateText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(publicText)).toBeInTheDocument();
    expect(screen.queryByText(privateText)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const publicText = 'public route';
    const privateText = 'private route';
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/login'} element={<span>{publicText}</span>} />
        <Route path={'/mylist'} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <span>{privateText}</span>
          </PrivateRoute>
        }
        />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByText(privateText)).toBeInTheDocument();
    expect(screen.queryByText(publicText)).not.toBeInTheDocument();
  });
});
