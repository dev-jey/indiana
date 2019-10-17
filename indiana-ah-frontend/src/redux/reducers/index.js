import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import userReducer from './userReducer';
import bookmarkReducer from './bookmarkReducer';
import userArticlesReducer from './userArticlesReducer';
import getSingleArticleReducer from './getSingleArticleReducer';
import commentsReducer from './commentReducer';
import articlesSearchReducer from './articlesSearchReducer';
import userStatsReducer from './userStatsReducer';
import editHistoryReducer from './editHistoryReducer';
import userFollowReducer from './userFollowReducer';

export default combineReducers({
  auth: authReducer,
  articles: articleReducer,
  user: userReducer,
  bookmarkedArticles: bookmarkReducer,
  allUserArticles: userArticlesReducer,
  singleArticle: getSingleArticleReducer,
  comments: commentsReducer,
  articlesSearchResults: articlesSearchReducer,
  statistics: userStatsReducer,
  editHistory: editHistoryReducer,
  userFollow: userFollowReducer
});
