import thunk from 'redux-thunk';
import { toast } from 'react-toastify';
import configureMockStore from 'redux-mock-store';
import { sendHttpRequest } from '../../src/utils';
import {
  GET_COMMENT_EDIT_HISTORY,
  COMMENT_EDIT_HISTORY_LOADING
} from '../../src/redux/actions/actionTypes';
import editHistory from '../../src/redux/actions/editHistoryActions';

jest.mock('../../src/utils');
jest.mock('react-toastify');
const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('Comment Edit history action creators test', () => {
  beforeEach(() => {
    store.clearActions();
  });
  const id = 'f2d7da57-28c4-444b-840c-d9a78afe00cd';
  const comments = {
    payload: [{
      commentBody: true,
      id,
      commentid: 1
    }]
  };

  const getError = status => ({
    response: {
      status,
      data: {
        message: 'hello'
      }
    }
  });

  it('should create the GET_COMMENT_EDIT_HISTORY action', async () => {
    sendHttpRequest.mockResolvedValue({
      commentEditHistory: comments.payload,
      message: 'Comment edit history fetched successfully'
    });
    const expectedActions = [
      { type: COMMENT_EDIT_HISTORY_LOADING },
      { type: GET_COMMENT_EDIT_HISTORY, payload: comments.payload },
    ];

    await store.dispatch(editHistory(id));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('should create the GET_COMMENT_EDIT_HISTORY', async () => {
    sendHttpRequest.mockRejectedValue(getError(404));
    await store.dispatch(editHistory(id));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the GET_COMMENT_EDIT_HISTORY action', async () => {
    sendHttpRequest.mockRejectedValue(getError(401));
    await store.dispatch(editHistory(id));
    expect(toast.error).toHaveBeenCalledWith('hello');
  });

  it('should create the GET_COMMENT_EDIT_HISTORY action', async () => {
    sendHttpRequest.mockRejectedValue(getError(400));
    await store.dispatch(editHistory(id));
    expect(toast.error).toHaveBeenCalledWith(`Cannot fetch the edited comments at the moment. 
          Please try again later`);
  });
});
