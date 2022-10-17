import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const url = `http://127.0.0.1:5000/api/users`;
    const response = await axios.post(url, data);
    console.log(response);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: response.data });
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
