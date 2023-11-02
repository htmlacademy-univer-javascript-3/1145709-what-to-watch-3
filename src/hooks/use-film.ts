import {useParams} from 'react-router-dom';
import {Film, Films} from '../types/film';

export const useFilm = (films: Films): Film | undefined => {
  const { id } = useParams();
  return id ? films.find((f) => f.id === id) : undefined;
};
