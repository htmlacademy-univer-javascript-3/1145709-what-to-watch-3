import {useFilm} from '../../hooks/use-film';
import {LoadingMessage} from '../../components/loading-messsage/loading-message.tsx';
import {useNavigate} from 'react-router-dom';
import {MouseEvent, useEffect, useRef, useState} from 'react';


function PlayerPage(): JSX.Element {
  const {isFilmLoading, film} = useFilm();
  const navigate = useNavigate();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const togglerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isToggleMouseDown, setIsToggleMouseDown] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const getProgressValue = (time: number | undefined, duration: number | undefined) => {
    if (!duration || !time || !progressRef.current) {
      return 0;
    }
    return time / duration * progressRef.current?.clientWidth;
  };


  const handleMouseMoveEvent = (event: MouseEvent<HTMLDivElement>) => {
    if (isToggleMouseDown && togglerRef.current && progressRef.current && videoRef.current) {
      const minOffset = progressRef.current?.offsetLeft + togglerRef.current?.clientWidth * 3 / 2;
      const maxOffset = progressRef.current?.offsetLeft + progressRef.current?.clientWidth + togglerRef.current?.clientWidth * 3 / 2;
      if (event.pageX > minOffset && event.pageX < maxOffset) {
        const diff = (event.pageX - minOffset);
        const newValue = diff / progressRef.current?.clientWidth * videoRef.current?.duration;
        setCurrentTime(newValue);
        videoRef.current.currentTime = newValue;
      }
    }
  };

  useEffect(() => {
    if (isFullScreen){
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [isFullScreen]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!isVideoLoading) {
      if (isPlaying) {
        videoRef.current?.play().then(() => {
          interval = setInterval(() => {
            if (videoRef.current?.currentTime === videoRef.current?.duration) {
              setIsPlaying(false);
            }
            setCurrentTime((videoRef.current?.currentTime ?? 0) + 0.1);
          }, 100);
        }).catch(() => {
          setIsPlaying(false);
        });
      } else {
        videoRef.current?.pause();
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, isVideoLoading]);

  useEffect(() => {
    if (isToggleMouseDown) {
      setIsPlaying(false);
    }
  }, [isToggleMouseDown]);

  useEffect(() => {
    if (!isVideoLoading){
      setIsPlaying(true);
    }
  }, [isVideoLoading]);

  if (isFilmLoading || film === null) {
    return <LoadingMessage/>;
  }

  const getCurrentDisplayTime = (time: number, duration: number | undefined) => new Date(time * 1000).toISOString().slice(duration && duration >= 3600 ? 11 : 14, 19);

  return (
    <div>
      <div className="player" onMouseMove={handleMouseMoveEvent} onMouseUp={() => setIsToggleMouseDown(false)}>
        <video ref={videoRef} src={film.videoLink} poster={film.backgroundImage} className="player__video" autoPlay
          onLoadedData={() => setIsVideoLoading(false)}
        >
        </video>

        <button type="button" className="player__exit" onClick={() => navigate(-1)}>Exit</button>

        {!isVideoLoading &&
          <div className="player__controls">
            <div className="player__controls-row">
              <div className="player__time">
                <progress ref={progressRef} className="player__progress" value={currentTime}
                  max={videoRef.current?.duration}
                />
                <div ref={togglerRef} className="player__toggler" onMouseDown={() => setIsToggleMouseDown(true)}
                  style={{left: getProgressValue(currentTime, videoRef.current?.duration)}}
                >Toggler
                </div>
              </div>
              <div className="player__time-value">{getCurrentDisplayTime(currentTime, videoRef.current?.duration)}</div>
            </div>

            <div className="player__controls-row">
              <button type="button" className="player__play" onClick={() => setIsPlaying(!isPlaying)}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  {isPlaying ? <use xlinkHref="#pause"></use> : <use xlinkHref="#play-s"></use>}
                </svg>
                <span>Play</span>
              </button>
              <div className="player__name" onMouseMove={handleMouseMoveEvent}>{film.name}</div>

              <button type="button" className="player__full-screen" onClick={() => setIsFullScreen(!isFullScreen)}>
                <svg viewBox="0 0 27 27" width="27" height="27">
                  <use xlinkHref="#full-screen"></use>
                </svg>
                <span>Full screen</span>
              </button>
            </div>
          </div>}
      </div>
    </div>
  );
}

export default PlayerPage;
