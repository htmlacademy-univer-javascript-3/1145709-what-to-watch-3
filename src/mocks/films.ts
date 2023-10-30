import {Films} from '../types/film';

const videoMockSrc = 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4';

export const films: Films = [
  {
    id: 'the-grand-budapest-hotel',
    title: 'The Grand Budapest Hotel',
    genre: 'Drama',
    year: 2014,
    ratingScore: 8.9,
    info: {
      director: 'Wes Anderson',
      starring: [{name: 'Ralph Fiennes'}, {name: 'F. Murray Abraham'}],
      text: 'The Grand Budapest Hotel is a 2014 comedy-drama film written and directed by Wes Anderson. Ralph Fiennes leads a seventeen-actor ensemble cast as Monsieur Gustave H., famed concierge of a twentieth-century mountainside resort in the fictional Eastern European country of Zubrowka. When Gustave is framed for the murder of a wealthy dowager (Tilda Swinton), he and his recently befriended protégé Zero (Tony Revolori) embark on a quest for fortune and a priceless Renaissance painting amidst the backdrop of an encroaching fascist regime. Anderson\'s American Empirical Pictures produced the film in association with Studio Babelsberg, Fox Searchlight Pictures, and Indian Paintbrush\'s Scott Rudin and Steven Rales. Fox Searchlight supervised the commercial distribution, and The Grand Budapest Hotel\'s funding was sourced through Indian Paintbrush and German government-funded tax rebates.',
    },
    posterImageSrc: '/img/the-grand-budapest-hotel-poster.jpg',
    imageSrc: '/img/bg-the-grand-budapest-hotel.jpg',
    reviews: [],
    videoSrc: videoMockSrc,
  },
  {
    id: 'fantastic-beasts-the-crimes-of-grindelwald',
    title: 'Fantastic Beasts: The Crimes of Grindelwald',
    genre: 'Fantasy',
    year: 2018,
    ratingScore: 6.5,
    info: {
      director: 'David Yates',
      starring: [{name: 'Eddie Redmayne'}, {name: 'Katherine Waterston'}],
      text: 'Fantastic Beasts: The Crimes of Grindelwald is a 2018 fantasy film directed by David Yates and written by J. K. Rowling. The sequel to Fantastic Beasts and Where to Find Them (2016), it is the second instalment in the Fantastic Beasts film series and the tenth overall in the Wizarding World franchise. It features an ensemble cast including Eddie Redmayne, Katherine Waterston, Dan Fogler, Alison Sudol, Ezra Miller, Zoë Kravitz, Callum Turner, Claudia Kim, William Nadylam, Kevin Guthrie, Jude Law, and Johnny Depp. Set in 1927, it follows Newt Scamander and Albus Dumbledore as they attempt to take down the dark wizard Gellert Grindelwald while facing new threats in a more divided wizarding world.',
    },
    posterImageSrc: '/img/Fantastic_Beasts_-_The_Crimes_of_Grindelwald_Poster.png',
    imageSrc: '/img/fantastic-beasts-the-crimes-of-grindelwald.jpg',
    reviews: [],
    videoSrc: videoMockSrc,
  },
  {
    id: 'bohemian-rhapsody',
    title: 'Bohemian Rhapsody',
    genre: 'Biographical drama',
    year: 2018,
    ratingScore: 8,
    info: {
      director: 'Bryan Singer',
      starring: [{name: 'Rami Malek'}, {name: 'Lucy Boynton'}],
      text: 'Bohemian Rhapsody is a 2018 biographical musical drama film that focuses on the life of Freddie Mercury, the lead singer of the British rock band Queen, from the formation of the band in 1970 to their 1985 Live Aid performance at the original Wembley Stadium. It was directed by Bryan Singer[a] from a screenplay by Anthony McCarten, and produced by Graham King and Queen manager Jim Beach. It stars Rami Malek as Mercury, with Lucy Boynton, Gwilym Lee, Ben Hardy, Joe Mazzello, Aidan Gillen, Tom Hollander, and Mike Myers in supporting roles. Queen members Brian May and Roger Taylor also served as consultants. A British-American venture, it was produced by Regency Enterprises, GK Films and Queen Films, and was distributed by 20th Century Fox.',
    },
    posterImageSrc: '/img/Bohemian_Rhapsody_poster.png',
    imageSrc: '/img/bohemian-rhapsody.jpg',
    reviews: [],
    videoSrc: videoMockSrc,
  },
  {
    id: 'macbeth',
    title: 'Macbeth',
    genre: 'Historical drama',
    year: 2015,
    ratingScore: 6.6,
    info: {
      director: 'Justin Kurzel',
      starring: [{name: 'Michael Fassbender'}, {name: 'Marion Cotillard'}],
      text: 'Macbeth is a 2015 epic historical drama film directed by Justin Kurzel and written for the screen by Todd Louiso, Jacob Koskoff, and Michael Lesslie, based on William Shakespeare\'s eponymous play.[6] The film stars Michael Fassbender in the title role and Marion Cotillard as Lady Macbeth, with Paddy Considine, Sean Harris, Jack Reynor, Elizabeth Debicki and David Thewlis in supporting roles. The story follows a Scottish lord\'s rise to power after receiving a prophecy from a trio of witches that one day he will become King of Scotland. Like the play it was adapted from, the film dramatises the damaging physical and psychological effects of political ambition on those who seek power for its own sake.',
    },
    posterImageSrc: '/img/Macbeth_2015_poster.jpg',
    imageSrc: '/img/macbeth.jpg',
    reviews: [],
    videoSrc: videoMockSrc,
  },
  {
    id: 'revenant',
    title: 'Revenant',
    genre: 'Drama',
    year: 2015,
    ratingScore: 8,
    info: {
      director: 'Alejandro G. Iñárritu',
      starring: [{name: 'Leonardo DiCaprio'}, {name: 'Tom Hardy'}],
      text: 'The Revenant is a 2015 American Western action drama film[5] directed by Alejandro G. Iñárritu. The screenplay by Mark L. Smith and Iñárritu is based in part on Michael Punke\'s 2002 novel The Revenant, which describes frontiersman Hugh Glass\'s experiences in 1823, and which is based on the 1915 poem The Song of Hugh Glass. The film stars Leonardo DiCaprio and Tom Hardy.[6]\n' +
        '\n' +
        'In August 2001, Akiva Goldsman purchased Punke\'s manuscript. Iñárritu signed on to direct The Revenant in August 2011; in April 2014, after several delays due to other projects, Iñárritu confirmed that he was beginning work on it and that DiCaprio had the lead role. Principal photography began in October 2014. Location and crew concerns delayed production from May to August 2015.',
    },
    posterImageSrc: '/img/The_Revenant_2015_film_poster.jpg',
    imageSrc: '/img/revenant.jpg',
    reviews: [],
    videoSrc: videoMockSrc,
  },
  {
    id: 'what-we-do-in-the-shadows',
    title: 'What We Do in the Shadows',
    genre: 'Horror comedy',
    year: 2019,
    ratingScore: 7.6,
    info: {
      director: 'Jemaine Clement',
      starring: [{name: 'Taika Waititi'}, {name: 'Jemaine Clement'}],
      text: 'What We Do in the Shadows is an American mockumentary comedy horror television series created by Jemaine Clement, first broadcast March 27, 2019, on FX. The series follows four vampire roommates on Staten Island, and stars Kayvan Novak, Matt Berry, Natasia Demetriou, Harvey Guillén, Mark Proksch, and Kristen Schaal.\n' +
        '\n' +
        'Based on the 2014 New Zealand film of the same name, written by Clement and Taika Waititi, it is the second television series in the franchise. The fifth season of What We Do in the Shadows premiered on July 13, 2023,[1] with a sixth season renewal already confirmed.[2] It has been critically acclaimed (particularly for its cast and writing) and nominated for 21 Emmy Awards, including Outstanding Comedy Series in 2020 and 2022 for its second and third season, respectively.',
    },
    posterImageSrc: '/img/What_We_Do_in_the_Shadows_Title_Card.jpg',
    imageSrc: '/img/what-we-do-in-the-shadows.jpg',
    reviews: [],
    videoSrc: videoMockSrc,
  },
  {
    id: 'we-need-to-talk-about-kevin',
    title: 'We Need to Talk About Kevin',
    genre: 'Drama',
    year: 2010,
    ratingScore: 7.2,
    info: {
      director: 'Lynne Ramsay',
      starring: [{name: 'Tilda Swinton'}, {name: 'John C. Reilly'}],
      text: 'We Need to Talk About Kevin is a 2011 psychological thriller drama film directed by Lynne Ramsay from a screenplay she co-wrote with Rory Stewart Kinnear, based on the 2003 novel of the same name by Lionel Shriver. A long process of development and financing began in 2005, with filming commencing in April 2010.\n' +
        '\n' +
        'Tilda Swinton stars as the mother of Kevin, struggling to come to terms with her psychopathic son and the horrors he has committed. The film premiered at the 2011 Cannes Film Festival and was released in the United Kingdom on 21 October 2011.\n' +
        '\n' +
        'Swinton was nominated for the Golden Globe Award, Screen Actors Guild Award, and the BAFTA for Best Actress in a Leading Role. It received generally positive reviews from critics.[5]',
    },
    posterImageSrc: '/img/We_need_to_talk_about_kevin_ver2.jpg',
    imageSrc: '/img/we-need-to-talk-about-kevin.jpg',
    reviews: [],
    videoSrc: videoMockSrc,
  },
  {
    id: 'aviator',
    title: 'Aviator',
    genre: 'Drama',
    year: 2004,
    ratingScore: 7.5,
    info: {
      director: 'Martin Scorsese',
      starring: [{name: 'Leonardo DiCaprio'}, {name: 'Cate Blanchett'}],
      text: 'The Aviator is a 2004 epic biographical drama film directed by Martin Scorsese and written by John Logan. It stars Leonardo DiCaprio as Howard Hughes, Cate Blanchett as Katharine Hepburn, and Kate Beckinsale as Ava Gardner. The supporting cast features Ian Holm, John C. Reilly, Alec Baldwin, Jude Law, Gwen Stefani, Kelli Garner, Matt Ross, Willem Dafoe, Alan Alda, and Edward Herrmann.\n' +
        '\n' +
        'Based on the 1993 non-fiction book Howard Hughes: The Secret Life by Charles Higham, the film depicts the life of Howard Hughes, an aviation pioneer and director of the film Hell\'s Angels. The film portrays his life from 1927 to 1947 during which time Hughes became a successful film producer and an aviation magnate while simultaneously growing more unstable due to severe obsessive–compulsive disorder (OCD).',
    },
    posterImageSrc: '/img/The_Aviator_(2004).png',
    imageSrc: '/img/aviator.jpg',
    reviews: [],
    videoSrc: videoMockSrc,
  },
];
