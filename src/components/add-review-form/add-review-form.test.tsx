import {createMemoryHistory, MemoryHistory} from 'history';
import {makeFakeStore, withHistory, withStore} from '../../utils/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import {APIRoute, AppRoute, AuthorizationStatus} from '../../const.ts';
import {authData} from '../../mocks/auth-data.ts';
import userEvent from '@testing-library/user-event';
import {extractActionsTypes} from '../../utils/mocks.ts';
import {getComments, postComment} from '../../store/thunks.ts';
import AddReviewForm from './add-review-form.tsx';
import {film} from '../../mocks/film.ts';
import {Route, Routes} from 'react-router-dom';
import {comments} from '../../mocks/comments.ts';

describe('Component: AddReviewForm', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    mockHistory.push(`${AppRoute.Films}/${film.id}/${AppRoute.Review}`);
  });

  it('should render correctly with auth', () => {
    const withHistoryComponent = withHistory((
      <Routes>
        <Route path={`${AppRoute.Films}/:id/${AppRoute.Review}`} element={<AddReviewForm />}/>
      </Routes>
    ), mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({}));
    render(withStoreComponent);

    expect(screen.getByText('Post')).toBeInTheDocument();
  });

  it('should correctly send request with auth', async () => {
    const withHistoryComponent = withHistory((
      <Routes>
        <Route path={`${AppRoute.Films}/:id/${AppRoute.Review}`} element={<AddReviewForm />}/>
        <Route path={`${AppRoute.Films}/:id`} element={<div>Comments</div>}/>
      </Routes>
    ), mockHistory);
    const {withStoreComponent, mockAxiosAdapter, mockStore} = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authData: authData,
        authorizationStatus: AuthorizationStatus.Auth,
        isAuthenticated: true,
        isAuthLoading: false,
        favoriteFilms: [],
        favoriteFilmsCount: null,
      }
    }));
    mockAxiosAdapter.onPost(`${APIRoute.Comments}/${film.id}`).reply(200, comments[0]);
    mockAxiosAdapter.onGet(`${APIRoute.Comments}/${film.id}`).reply(200, comments);

    render(withStoreComponent);

    await userEvent.click(
      screen.getByTestId('rate-5'),
    );

    await userEvent.type(
      screen.getByTestId('review-text'),
      'Text'.repeat(50),
    );

    await userEvent.click(
      screen.getByRole('button')
    );

    expect(mockHistory.location.pathname + mockHistory.location.search).toEqual(`${AppRoute.Films}/${film.id}?tab=reviews`);

    expect(extractActionsTypes(mockStore.getActions())).toEqual([
      postComment.pending.type,
      getComments.pending.type,
      postComment.fulfilled.type,
      getComments.fulfilled.type,
    ]);
  });
});
