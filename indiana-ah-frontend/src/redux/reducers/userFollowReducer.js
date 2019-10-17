import {
  GET_ALL_USER_FOLLOWING_LOADING,
  GET_ALL_USER_FOLLOWING_FAILURE,
  GET_ALL_USER_FOLLOWING_SUCCESS,
  UNFOLLOW_USER_SUCCESS,
  GET_ALL_USER_FOLLOWERS_LOADING,
  GET_ALL_USER_FOLLOWERS_FAILURE,
  GET_ALL_USER_FOLLOWERS_SUCCESS,
  FOLLOW_USER_SUCCESS,
} from '../actions/actionTypes';


const initialState = {
  isFollowersLoading: false,
  followers: [],
  followersCount: 0,

  isUsersFollowedLoading: false,
  UsersFollowed: [],
  UsersFollowedCount: 0,
  error: false
};

const userFollowReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER_FOLLOWING_LOADING:
      return {
        ...state,
        isUsersFollowedLoading: true
      };
    case GET_ALL_USER_FOLLOWING_SUCCESS:
      return {
        ...state,
        isUsersFollowedLoading: false,
        UsersFollowed: action.payload.following,
        UsersFollowedCount: action.payload.count,
        error: false
      };
    case GET_ALL_USER_FOLLOWING_FAILURE:
      return {
        ...state,
        isUsersFollowedLoading: false,
        error: true
      };
    case GET_ALL_USER_FOLLOWERS_LOADING:
      return {
        ...state,
        isFollowersLoading: true
      };
    case GET_ALL_USER_FOLLOWERS_SUCCESS:
      return {
        ...state,
        isFollowersLoading: false,
        followers: action.payload.following,
        followersCount: action.payload.count,
        error: false
      };
    case GET_ALL_USER_FOLLOWERS_FAILURE:
      return {
        ...state,
        isFollowersLoading: false,
        error: true
      };
    case UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        UsersFollowed: state.UsersFollowed.filter(user => user.username !== action.payload),
        UsersFollowedCount: state.UsersFollowedCount - 1
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        UsersFollowed: [...state.UsersFollowed, action.payload],
        UsersFollowedCount: state.UsersFollowedCount + 1
      };
    default:
      return state;
  }
};

export default userFollowReducer;
