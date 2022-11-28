import {
  PROJECT_ADD_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_RESET,
  PROJECT_ADD_SUCCESS,
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
