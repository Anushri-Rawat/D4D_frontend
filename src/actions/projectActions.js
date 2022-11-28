import {
  PROJECT_ADD_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_SUCCESS,
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
