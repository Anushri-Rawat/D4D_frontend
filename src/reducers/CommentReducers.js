import {
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_RESET,
  COMMENT_CREATE_SUCCESS,
  COMMENT_DETAILS_FAIL,
  COMMENT_DETAILS_REQUEST,
  COMMENT_DETAILS_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
  COMMENT_UPDATE_RESET,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_DELETE_RESET,
} from "./../constants/commentConstants";

export const commentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_CREATE_REQUEST:
      return { loading: true, success: false };
    case COMMENT_CREATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case COMMENT_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case COMMENT_CREATE_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const commentDetailsReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case COMMENT_DETAILS_REQUEST:
      return { loading: true, commentInfo: {} };
    case COMMENT_DETAILS_SUCCESS:
      return { loading: false, commentInfo: action.payload };
    case COMMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
      return { loading: true };
    case COMMENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case COMMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case COMMENT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const commentUpdateReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case COMMENT_UPDATE_REQUEST:
      return { loading: true };
    case COMMENT_UPDATE_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case COMMENT_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case COMMENT_UPDATE_RESET:
      return { comment: {} };
    default:
      return state;
  }
};
