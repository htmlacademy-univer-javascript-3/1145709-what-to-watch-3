import {act, fireEvent, render, screen} from '@testing-library/react';
import VideoPlayer from './video-player.tsx';
import {films} from '../../mocks/films.ts';

describe('Component: VideoPlayer', () => {
  const film = films[0];
  HTMLMediaElement.prototype.load = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useFakeTimers();
  });it('should render correctly', () => {
    render(<VideoPlayer film={film}/>);
    expect(screen.getByTestId('video')).toBeInTheDocument();
  });

  it('should start/stop on mouse event', async () => {
    HTMLVideoElement.prototype.play = vi.fn().mockReturnValue({then: () => {
      // do nothing
    }});
    HTMLVideoElement.prototype.pause = vi.fn();

    render(<VideoPlayer film={film}/>);

    fireEvent.mouseEnter(screen.getByTestId('video'));
    await act(() => vi.advanceTimersByTime(1000));
    expect(HTMLVideoElement.prototype.play).toBeCalledTimes(1);
  });
});
