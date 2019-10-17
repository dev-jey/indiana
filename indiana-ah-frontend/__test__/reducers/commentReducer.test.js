import commentReducer from '../../src/redux/reducers/commentReducer';
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_ALL_ARTICLE_COMMENTS,
  COMMENTS_LOADING,
  EDIT_COMMENT,
  EDIT_COMMENTS_FAILURE,
  DISLIKE_COMMENT,
  LIKE_COMMENT
} from '../../src/redux/actions/actionTypes';

const initialState1 = {
  isLoading: false,
  comments: [
    {
      id: 4,
      articleId: 3,
      userId: 2,
      commentBody: 'awesome',
      likedByMe: true,
      dislikedByMe: false,
      commenter: {
        name: 'Omenkish',
        username: 'Omenkish',
        imageUrl: 'www.livescores.com'
      }
    }
  ]
};

const responseData = { comments: [{ commentBody: 'Im the man' }] };
describe('commentReducer test', () => {
  const action = {
    payload: 'comment'
  };

  it('should test for the the initial state', () => {
    expect(commentReducer(undefined, {})).toEqual({
      ...initialState1,
      comments: []
    });
  });

  it('should handle the COMMENTS_LOADING action', () => {
    expect(commentReducer(initialState1, { type: COMMENTS_LOADING })).toEqual({
      ...initialState1,
      isLoading: true
    });
  });
  it('should handle the ADD_COMMENT action', () => {
    expect(
      commentReducer(initialState1, {
        type: ADD_COMMENT,
        payload: 'comment'
      })
    ).toEqual({
      ...initialState1,
      comments: [action.payload, ...initialState1.comments]
    });
  });

  it('should handle the DELETE_BOOKMARK action', () => {
    expect(commentReducer(initialState1, { type: DELETE_COMMENT, id: 1 })).toEqual({
      ...initialState1,
      comments: initialState1.comments.filter(post => post.id !== 1)
    });
  });

  it('should handle the GET_ALL_ARTICLE_COMMENTS action', () => {
    expect(
      commentReducer(initialState1, {
        type: GET_ALL_ARTICLE_COMMENTS,
        payload: responseData
      })
    ).toEqual({
      ...initialState1,
      comments: responseData
    });
  });

  it('should handle the EDIT_COMMENT action', () => {
    expect(
      commentReducer(initialState1, {
        type: EDIT_COMMENT,
        payload: initialState1.comments
      })
    ).toEqual({
      ...initialState1,
      isLoading: false,
      comments: initialState1.comments.map(comment => (comment.id === action.payload.id ? action.payload : comment))
    });
  });
  it('should handle the EDIT_COMMENTS_FAILURE action', () => {
    expect(
      commentReducer(initialState1, {
        type: EDIT_COMMENTS_FAILURE
      })
    ).toEqual({
      ...initialState1,
      isLoading: false
    });
  });
  it('should handle the LIKE_COMMENT action', () => {
    expect(commentReducer(initialState1, { type: LIKE_COMMENT, payload: 4 })).toEqual({
      ...initialState1
    });
  });

  it('should handle the DISLIKE_COMMENT action', () => {
    expect(commentReducer(initialState1, { type: DISLIKE_COMMENT, payload: 4 })).toEqual({
      ...initialState1
    });
  });
});
