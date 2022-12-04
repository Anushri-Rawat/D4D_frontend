import {
  LIKED_PROJECT_FAIL,
  LIKED_PROJECT_REQUEST,
  LIKED_PROJECT_SUCCESS,
  PROJECT_ADD_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_RESET,
  PROJECT_ADD_SUCCESS,
  VIEWED_PROJECT_FAIL,
  VIEWED_PROJECT_REQUEST,
  VIEWED_PROJECT_SUCCESS,
} from "./../constants/projectConstants";
export const projectDetailsReducer = (
  state = { loading: false, success: false, error: "" },
  action
) => {
  switch (action.type) {
    case PROJECT_ADD_REQUEST:
      return { loading: true, success: false };
    case PROJECT_ADD_SUCCESS:
      return { loading: false, success: true, projectInfo: action.payload };
    case PROJECT_ADD_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PROJECT_ADD_RESET:
      return { loading: false, success: false, error: "" };
    default:
      return state;
  }
};

export const likedProjectReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case LIKED_PROJECT_REQUEST:
      return { loading: true, success: false };
    case LIKED_PROJECT_SUCCESS:
      return { loading: false, success: true, projects: action.payload };
    case LIKED_PROJECT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const viewedProjectReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case VIEWED_PROJECT_REQUEST:
      return { loading: true, success: false };
    case VIEWED_PROJECT_SUCCESS:
      return { loading: false, success: true, projects: action.payload };
    case VIEWED_PROJECT_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
