import {Review} from './review';
import {Artist} from './artist';

export type Film = {
  id: string;
  title: string;
  genre: string;
  year: number;
  ratingScore: number;
  info: {
    text: string;
    director: string;
    starring: Artist[];
  };
  posterImageSrc: string;
  imageSrc: string;
  videoSrc: string;
  reviews: Review[];
}


export type Films = Film[];
