import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDetailsReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  projectDetailsReducer,
  projectListReducer,
  projectCreateReducer,
  projectUpdateReducer,
  projectDeleteReducer,
} from "./reducers/projectReducer";
import {
  commentDetailsReducer,
  commentCreateReducer,
  commentDeleteReducer,
  commentUpdateReducer,
} from "./reducers/CommentReducers";
const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  projectDetails: projectDetailsReducer,
  projectList: projectListReducer,
  projectCreate: projectCreateReducer,
  projectUpdate: projectUpdateReducer,
  projectDelete: projectDeleteReducer,
  commentCreate: commentCreateReducer,
  commentDetails: commentDetailsReducer,
  commentDelete: commentDeleteReducer,
  commentUpdate: commentUpdateReducer,
});

const userInfoFromStorage =
  JSON.parse(localStorage.getItem("userInfo")) || null;

const userFromStorage = JSON.parse(localStorage.getItem("userDetails")) || null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userDetails: { user: userFromStorage },
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
