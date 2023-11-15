import {useEffect, useRef, useState} from 'react';
import {Film} from '../../types/film';

function VideoPlayer({film}: {film: Film}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: number;
    if (videoRef) {
      if (isPlaying) {
        timer = setTimeout(() => {
          videoRef.current?.play().then(() => {
            // Automatic playback started!
          });
        }, 1000);
      } else {
        videoRef.current?.load();
      }
    }

    return () => clearTimeout(timer);
  }, [isPlaying]);

  return (
    <div className="small-film-card__image" onMouseEnter={() => setIsPlaying(true)} onMouseLeave={() => setIsPlaying(false)}>
      <video ref={videoRef} width={'100%'} preload={'auto'} src={film.videoSrc} poster={film.imageSrc} muted="muted"/>
    </div>
  );
}


export default VideoPlayer;
