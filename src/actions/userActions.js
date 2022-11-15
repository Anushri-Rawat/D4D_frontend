import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_RESET,
} from "../constants/userConstants";

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const url = `http://127.0.0.1:5000/api/users`;
    const response = await axios.post(url, data);
    console.log(response);
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
    console.log(response);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: response.data });
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, payload: err.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("profileInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
};

export const updateProfile = (userInfo, data) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST });
    const url = `http://127.0.0.1:5000/api/users`;
    const res = await axios.patch(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(res);
    dispatch({ type: USER_PROFILE_UPDATE_SUCCESS, payload: res.data });
    localStorage.setItem("profileInfo", JSON.stringify(res.data));
  } catch (err) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
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
  } catch (err) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};
