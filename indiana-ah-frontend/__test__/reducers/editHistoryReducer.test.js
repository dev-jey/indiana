import editHistoryReducer from '../../src/redux/reducers/editHistoryReducer';
import {
  GET_COMMENT_EDIT_HISTORY,
  COMMENT_EDIT_HISTORY_LOADING
} from '../../src/redux/actions/actionTypes';

const initialState1 = {
  isLoading: false,
  editHistory: [{
    id: 4,
    articleId: 3,
    userId: 2,
    commenter: {
      name: 'Omenkish',
      username: 'Omenkish',
      imageUrl: 'www.livescores.com'
    }
  }],
};
const responseData = { editHistory: [{ commentBody: 'Im the man' }] };
describe('editHistoryReducer test', () => {
  it('should test for the the initial state', () => {
    expect(editHistoryReducer(undefined, {})).toEqual({
      ...initialState1, editHistory: []
    });
  });

  it('should handle the COMMENT_EDIT_HISTORY_LOADING action', () => {
    expect(editHistoryReducer(initialState1, { type: COMMENT_EDIT_HISTORY_LOADING })).toEqual({
      ...initialState1,
      isLoading: true
    });
  });

  it('should handle the GET_COMMENT_EDIT_HISTORY action', () => {
    expect(editHistoryReducer(initialState1, { type: GET_COMMENT_EDIT_HISTORY, payload: responseData })).toEqual({
      ...initialState1,
      editHistory: responseData
    });
  });
});
