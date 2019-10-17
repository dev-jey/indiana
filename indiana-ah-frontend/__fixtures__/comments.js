import moment from 'moment';

export default [
  {
    id: 1,
    articleId: 1,
    userId: 1,
    commentBody: 'We are africans',
    createdAt: moment(0),
    updatedAt: moment(10),
    commenter: {
      name: 'omenkish',
      username: 'Omenkish',
      imageUrl: 'goal.com/en-gb'
    }
  },
  {
    id: 2,
    articleId: 2,
    userId: 2,
    commentBody: 'We are africans',
    createdAt: moment(-10000),
    updatedAt: moment(10),
    commenter: {
      name: 'omenkish Baller',
      username: 'omenkish',
      imageUrl: 'goal.com/en-gb/hello-world'
    }
  }
];
