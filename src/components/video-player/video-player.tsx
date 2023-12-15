import {useEffect, useRef, useState} from 'react';
import {FilmShallow} from '../../types/film-shallow.ts';

function VideoPlayer({film}: {film: FilmShallow}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
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
      <video ref={videoRef} width={'100%'} preload={'auto'} src={film.previewVideoLink} poster={film.previewImage} muted/>
    </div>
  );
}


export default VideoPlayer;
