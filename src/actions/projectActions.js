import {
  LIKED_PROJECT_FAIL,
  LIKED_PROJECT_REQUEST,
  LIKED_PROJECT_SUCCESS,
  PROJECT_ADD_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_SUCCESS,
  VIEWED_PROJECT_FAIL,
  VIEWED_PROJECT_REQUEST,
  VIEWED_PROJECT_SUCCESS,
} from "../constants/projectConstants";
import axios from "axios";

export const createProject =
  (userInfo, data, videoData) => async (dispatch) => {
    try {
      dispatch({ type: PROJECT_ADD_REQUEST });

      const url = `http://127.0.0.1:5000/api/project`;
      const res = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      const url2 = `http://127.0.0.1:5000/api/project/${res.data.id}/upload_video`;
      const res2 = await axios.post(url2, videoData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      dispatch({ type: PROJECT_ADD_SUCCESS, payload: res2.data });
    } catch (err) {
      dispatch({
        type: PROJECT_ADD_FAIL,
        payload: err.response.data.message,
      });
    }
  };
export const getMostLikedProjects = () => async (dispatch) => {
  try {
    dispatch({ type: LIKED_PROJECT_REQUEST });
    const url = "http://127.0.0.1:5000/api/project/most_liked";
    const res = await axios.get(url);
    console.log(res);
    dispatch({ type: LIKED_PROJECT_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: LIKED_PROJECT_FAIL, payload: err });
  }
};

export const getMostViewedProjects = () => async (dispatch) => {
  try {
    dispatch({ type: VIEWED_PROJECT_REQUEST });
    const url = "http://127.0.0.1:5000/api/project/most_viewed";
    const res = await axios.get(url);
    console.log(res);
    dispatch({ type: VIEWED_PROJECT_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: VIEWED_PROJECT_FAIL, payload: err });
  }
};
