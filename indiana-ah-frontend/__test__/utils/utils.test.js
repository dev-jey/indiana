import {
  setAndGetCurrentPage,
  getUrl,
  recordDisLike,
  recordLike,
  filterArticlesByLikes,
  filterArticlesByDate
} from '../../src/utils';
import { validate } from '../../src/utils/validationSchemas';

describe('Pagination utils test', () => {
  const component = {
    state: {},
    setState(obj) {
      Object.assign(this.state, obj);
    }
  };
  it('should test that the current page is set in a component\'s state when the \'setCurrentPage\' method is called', () => {
    setAndGetCurrentPage(component);
    expect(component.state.currentPage).toBeDefined();
  });
});

describe('Backend url', () => {
  it('should point to the right backend branch', () => {
    const host = 'https://indiana-ah-frontend-staging.herokuapp.com';
    const url = getUrl(host);
    expect(url).toEqual('https://indiana-ah-staging.herokuapp.com/api/v1/');
    const host2 = 'localhost:3000';
    const url2 = getUrl(host2);
    expect(url2).toEqual('https://indiana-ah-staging.herokuapp.com/api/v1/');
  });
  it('should point to the right backend branch', () => {
    const host = 'https://indiana-ah-frontend.herokuapp.com';
    const url = getUrl(host);
    expect(url).toEqual('https://indiana-ah-master.herokuapp.com/api/v1/');
  });
});

describe('filterArticlesByLikes test', () => {
  it('should test the filterArticlesByLikes function', () => {
    const articles = [
      { likes: 26 },
      { likes: 20 },
      { likes: 8 },
      { likes: 50 },
      { likes: 50 },
      { likes: 100 },
      { likes: 15 },
      { likes: 18 },
      { likes: 98 },
      { likes: 10 }
    ];
    const filteredArticles = filterArticlesByLikes(articles);
    expect(filteredArticles[0].likes).toEqual(100);
    expect(filteredArticles.length).toEqual(7);
  });
});

describe('filterArticlesByDate test', () => {
  it('should test the filterArticlesByDate function', () => {
    const articles = [
      { createdAt: '2019-03-25 12:14:28.34+01' },
      { createdAt: '2017-03-25 12:14:28.34+01' },
      { createdAt: '2018-03-25 12:14:28.34+01' },
      { createdAt: '2018-03-25 12:14:28.34+01' },
      { createdAt: '2016-03-25 12:14:28.34+01' },
    ];
    const filteredArticles = filterArticlesByDate(articles);
    expect(filteredArticles[0].createdAt).toEqual('2019-03-25 12:14:28.34+01');
    expect(filteredArticles.length).toEqual(5);
  });
});

describe('Test submission for errors', () => {
  it('return true if there are no errors', () => {
    const errors = { confirmPassword: '', password: '' };
    const isValid = validate(errors);
    expect(isValid).toEqual(true);
  });
  it('return false if there are errors', () => {
    const errors = {
      confirmPassword: 'passwords don\'t match, password',
      password: 'Password must be alphanumeric'
    };
    const isValid = validate(errors);
    expect(isValid).toEqual(false);
  });
});


describe('reactions utils test', () => {
  it('should test the recordLike function', () => {
    let article = {
      likedByMe: true,
      dislikedByMe: false,
      likes: 1
    };
    recordLike(article);
    expect(article.likes).toEqual(0);
    article = {
      dislikedByMe: true,
      likedByMe: false,
      dislikes: 1
    };
    recordLike(article);
    expect(article.likedByMe).toEqual(true);
  });

  it('should test the recordDisLike function', () => {
    const article = {
      dislikedByMe: true,
      dislikes: 1
    };
    recordDisLike(article);
    expect(article.dislikes).toEqual(0);
  });
});
