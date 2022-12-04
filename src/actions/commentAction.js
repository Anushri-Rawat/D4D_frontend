import {
  COMMENT_CREATE_FAIL,
  COMMENT_CREATE_REQUEST,
  COMMENT_CREATE_SUCCESS,
  COMMENT_DETAILS_FAIL,
  COMMENT_DETAILS_REQUEST,
  COMMENT_DETAILS_SUCCESS,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_UPDATE_FAIL,
  COMMENT_UPDATE_REQUEST,
  COMMENT_UPDATE_SUCCESS,
} from "../constants/commentConstants";
import axios from "axios";

export const createComment =
  (userInfo, data, project_id) => async (dispatch) => {
    try {
      dispatch({ type: COMMENT_CREATE_REQUEST });

      const url = `http://127.0.0.1:5000/api/comment/${project_id}`;
      const res = await axios.post(url, data, {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: COMMENT_CREATE_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({
        type: COMMENT_CREATE_FAIL,
        payload: err.response.data.message,
      });
    }
  };

export const getComment = (userInfo, id) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_DETAILS_REQUEST });

    const url = `http://127.0.0.1:5000/api/comment/${id}`;
    const res = await axios.get(url, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: COMMENT_DETAILS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COMMENT_DETAILS_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const deleteComment = (userInfo, id) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_DELETE_REQUEST });
    console.log(id);

    const url = `http://127.0.0.1:5000/api/comment/${id}`;
    const res = await axios.delete(url, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: COMMENT_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const updateComment = (userInfo, data, id) => async (dispatch) => {
  try {
    dispatch({ type: COMMENT_UPDATE_REQUEST });

    const url = `http://127.0.0.1:5000/api/comment/${id}`;
    const res = await axios.patch(url, data, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: COMMENT_UPDATE_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: COMMENT_UPDATE_FAIL,
      payload: err.response.data.message,
    });
  }
};
