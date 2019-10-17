import {
  GET_USER_STATS_REQUEST,
  GET_USER_STATS_ERROR,
  GET_USER_STATS_SUCCESS
} from '../../src/redux/actions/actionTypes';
import userStatReducer from '../../src/redux/reducers/userStatsReducer';

const initialState = {
  error: '',
  isLoading: false,
  data: []
};

describe('User statistics reducer test', () => {
  it('should test the initial state', () => {
    expect(userStatReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle get user statistics request', () => {
    expect(userStatReducer(initialState, { type: GET_USER_STATS_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });
  it('should handle get user statistics error', () => {
    expect(
      userStatReducer(initialState, {
        type: GET_USER_STATS_ERROR,
        payload: 'There was an error fetching your statistics'
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: 'There was an error fetching your statistics'
    });
  });
  it('should handle get user statistics success', () => {
    expect(
      userStatReducer(initialState, { type: GET_USER_STATS_SUCCESS, payload: [{}] })
    ).toEqual({
      ...initialState,
      isLoading: false,
      data: [{}]
    });
  });
});
