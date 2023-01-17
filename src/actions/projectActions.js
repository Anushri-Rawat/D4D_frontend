import {
  LIKED_PROJECT_FAIL,
  LIKED_PROJECT_REQUEST,
  LIKED_PROJECT_SUCCESS,
  PROJECT_ADD_FAIL,
  PROJECT_ADD_REQUEST,
  PROJECT_ADD_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  SEARCH_PROJECT_FAIL,
  SEARCH_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
  VIEWED_PROJECT_FAIL,
  VIEWED_PROJECT_REQUEST,
  VIEWED_PROJECT_SUCCESS,
} from "../constants/projectConstants";

import axios from "axios";

export const createProject = (userInfo, data) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_ADD_REQUEST });

    const url = `http://127.0.0.1:5000/api/project`;
    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${userInfo.token}`,
      },
    });

    //const url2 = `http://127.0.0.1:5000/api/project/${res.data.id}/upload_video`;
    // const res2 = await axios.post(url2, videoData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     authorization: `Bearer ${userInfo.token}`,
    //   },
    // });

    dispatch({ type: PROJECT_ADD_SUCCESS, payload: res.data });
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
    dispatch({ type: VIEWED_PROJECT_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: VIEWED_PROJECT_FAIL, payload: err });
  }
};

export const getProjects = (tech, keyword) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_PROJECT_REQUEST });
    let url = `http://127.0.0.1:5000/api/project/search?`;
    console.log(tech, keyword);
    if (tech.length > 0) {
      console.log("in if");
      url = `http://127.0.0.1:5000/api/project/search?required_skills=${tech}`;
    }
    if (keyword && tech) {
      url += `&keyword=${keyword}`;
      console.log("in if 2");
    } else if (keyword) {
      url += `keyword=${keyword}`;
      console.log("in else if");
    }
    console.log(url);
    const res = await axios.get(url);
    console.log(res);
    dispatch({ type: SEARCH_PROJECT_SUCCESS, payload: res.data.projects });
  } catch (err) {
    dispatch({ type: SEARCH_PROJECT_FAIL, payload: err });
  }
};
