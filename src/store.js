import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDetailsReducer,
  userLoginReducer,
  userProfileReducer,
  userRegisterReducer,
  userUpdateReducer,
  searchProfileReducer,
} from "./reducers/userReducers";
import {
  likedProjectReducer,
  projectDetailsReducer,
  viewedProjectReducer,
  searchProjectReducer,
} from "./reducers/projectReducer";
const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfile: userProfileReducer,
  userDetails: userDetailsReducer,
  projectDetails: projectDetailsReducer,
  likedProjects: likedProjectReducer,
  viewedProjects: viewedProjectReducer,
  searchProjects: searchProjectReducer,
  searchProfiles: searchProfileReducer,
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
