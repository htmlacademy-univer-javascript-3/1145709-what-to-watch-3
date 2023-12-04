import {Review} from './review';
import {Artist} from './artist';

export type Film = {
  id: string;
  name: string;
  genre: string;
  year: number;
  ratingScore: number;
  info: {
    text: string;
    director: string;
    starring: Artist[];
  };
  posterImageSrc: string;
  previewImage: string;
  previewVideoLink: string;
  reviews: Review[];
}


export type Films = Film[];
