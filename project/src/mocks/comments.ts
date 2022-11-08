import { Comments } from './../types/comments';

export const comments: Comments = [
  {
    id: 1,
    user: {
      id: 12,
      isPro: true,
      name: 'Isaac',
      avatarUrl: 'https://11.react.pages.academy/static/avatar/3.jpg'
    },
    rating: 4,
    comment:
      'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    date: '2022-10-16T13:58:46.495Z'
  },
  {
    id: 2,
    user: {
      id: 12,
      isPro: true,
      name: 'Vasya',
      avatarUrl: 'https://11.react.pages.academy/static/avatar/2.jpg'
    },
    rating: 2.5,
    comment: 'Nice place. But there were few fat rats',
    date: '2022-10-16T13:58:46.495Z'
  }
];
