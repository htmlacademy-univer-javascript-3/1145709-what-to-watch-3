import {RatingDescriptions} from '../../const.ts';

export const getDescriptionByRate = (rate: number): RatingDescriptions => {
  if (rate < 3) {
    return 'Bad';
  } else if (rate < 5) {
    return 'Normal';
  } else if (rate < 8) {
    return 'Good';
  } else if (rate < 10) {
    return 'Very good';
  } else {
    return 'Awesome';
  }
};
