import {Film} from '../types/film';

export const useFilm = (): Film | undefined => ({
  id: 'the-grand-budapest-hotel',
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year: 2014,
  ratingScore: 8.9,
  info: {
    director: 'Wes Anderson',
    starring: [{name: 'Ralph Fiennes'}, {name: 'F. Murray Abraham'}],
    text: 'The Grand Budapest Hotel is a 2014 comedy-drama film written and directed by Wes Anderson. Ralph Fiennes leads a seventeen-actor ensemble cast as Monsieur Gustave H., famed concierge of a twentieth-century mountainside resort in the fictional Eastern European country of Zubrowka. When Gustave is framed for the murder of a wealthy dowager (Tilda Swinton), he and his recently befriended protégé Zero (Tony Revolori) embark on a quest for fortune and a priceless Renaissance painting amidst the backdrop of an encroaching fascist regime. Anderson\'s American Empirical Pictures produced the film in association with Studio Babelsberg, Fox Searchlight Pictures, and Indian Paintbrush\'s Scott Rudin and Steven Rales. Fox Searchlight supervised the commercial distribution, and The Grand Budapest Hotel\'s funding was sourced through Indian Paintbrush and German government-funded tax rebates.',
  },
  posterImageSrc: '/img/the-grand-budapest-hotel-poster.jpg',
  previewImage: '/img/bg-the-grand-budapest-hotel.jpg',
  reviews: [
    {
      id: 1,
      text: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years',
      authorName: 'Kate Muir',
      created: new Date(2014, 11, 24).toJSON(),
      rating: 8.9,
    },
    {
      id: 2,
      text: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years',
      authorName: 'Kate Muir',
      created: new Date(2014, 11, 24).toJSON(),
      rating: 7,
    },
    {
      id: 3,
      text: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years',
      authorName: 'Kate Muir',
      created: new Date(2014, 11, 24).toJSON(),
      rating: 9,
    },
    {
      id: 4,
      text: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years',
      authorName: 'Kate Muir',
      created: new Date(2014, 11, 24).toJSON(),
      rating: 1,
    },
    {
      id: 5,
      text: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed films in years',
      authorName: 'Kate Muir',
      created: new Date(2014, 11, 24).toJSON(),
      rating: 5,
    },
  ],
  previewVideoLink: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
});
