import {fireEvent, render, screen} from '@testing-library/react';
import {expect} from 'vitest';


import userEvent from '@testing-library/user-event';
import PlayerPage from './player-page.tsx';
import {makeFakeStore, withHistory, withStore} from '../../utils/mock-component.tsx';
import {film} from '../../mocks/film.ts';
import {comments} from '../../mocks/comments.ts';
import {similarFilms} from '../../mocks/similar-films.ts';

describe('Component: Player page', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(withHistory(<PlayerPage/>), makeFakeStore({}));

    render(withStoreComponent);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render page correctly', () => {
    const {withStoreComponent} = withStore(withHistory(<PlayerPage/>), makeFakeStore({
      film: {
        film: film,
        similarFilms: [],
        filmComments: comments,
        isFilmLoading: false,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId('player')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should pause/play correctly', async () => {
    const {withStoreComponent} = withStore(withHistory(<PlayerPage/>), makeFakeStore({
      film: {
        film: film,
        similarFilms: similarFilms,
        filmComments: comments,
        isFilmLoading: false,
      }
    }));

    HTMLVideoElement.prototype.play = vi.fn().mockReturnValue({
      then: () => ({
        catch: () => undefined
      }),
    });
    HTMLVideoElement.prototype.pause = vi.fn();
    document.exitFullscreen = vi.fn();


    render(withStoreComponent);

    fireEvent.loadedData(screen.getByTestId('player'));

    expect(screen.getByTestId('player')).toBeInTheDocument();
    expect(screen.getByTestId('play')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('play'));
    expect(screen.getByText('Play')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('play'));
    expect(screen.getByText('Pause')).toBeInTheDocument();
  });
});
