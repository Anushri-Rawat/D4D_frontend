import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_RESET,
  SEARCH_PROFILE_REQUEST,
  SEARCH_PROFILE_SUCCESS,
  SEARCH_PROFILE_FAIL,
  USER_PROFILE_RESET,
} from "../constants/userConstants";

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const url = `http://127.0.0.1:5000/api/users`;
    const response = await axios.post(url, data);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (err) {
    dispatch({ type: USER_REGISTER_FAIL, payload: err.response.data.message });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const url = `http://127.0.0.1:5000/api/users/login`;
    const response = await axios.post(url, data);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userDetails");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_PROFILE_RESET });
};

export const updateSelfProfile = (userInfo, data) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_UPDATE_REQUEST });
    const url = `http://127.0.0.1:5000/api/users`;
    const res = await axios.patch(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_DETAILS_UPDATE_SUCCESS, payload: res.data });
    localStorage.setItem("userDetails", JSON.stringify(res.data));
  } catch (err) {
    dispatch({
      type: USER_DETAILS_UPDATE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getMyProfile = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const url = `http://127.0.0.1:5000/api/users`;
    const res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: res.data });
    localStorage.setItem("userDetails", JSON.stringify(res.data));
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getProfileById = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const url = `http://127.0.0.1:5000/api/users/${id}`;
    const res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: USER_PROFILE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const getProfiles = (tech, title, name) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_PROFILE_REQUEST });
    let skills = tech ? tech : "";
    title = title ? title : "";
    let full_name = name ? name : "";
    let url = `http://127.0.0.1:5000/api/users/search?skills=${skills}&full_name=${full_name}&title=${title}`;
    // if (tech) {
    //   url = `http://127.0.0.1:5000/api/PROFILE/search?skills=${tech}`;
    // }
    // if (keyword && tech) {
    //   url += `&keyword=${keyword}`;
    //   console.log("in if 2");
    // } else if (keyword) {
    //   url += `keyword=${keyword}`;
    //   console.log("in else if");
    // }
    console.log(url);
    const res = await axios.get(url);
    console.log(res);
    dispatch({ type: SEARCH_PROFILE_SUCCESS, payload: res.data.profiles });
  } catch (err) {
    dispatch({ type: SEARCH_PROFILE_FAIL, payload: err });
  }
};
