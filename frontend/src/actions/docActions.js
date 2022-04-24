import {
    DOCS_CREATE_FAIL,
    DOCS_CREATE_REQUEST,
    DOCS_CREATE_SUCCESS,
    DOCS_DELETE_FAIL,
    DOCS_DELETE_REQUEST,
    DOCS_DELETE_SUCCESS,
    DOCS_LIST_FAIL,
    DOCS_LIST_REQUEST,
    DOCS_LIST_SUCCESS,
    DOCS_UPDATE_FAIL,
    DOCS_UPDATE_REQUEST,
    DOCS_UPDATE_SUCCESS,
  } from "../constants/docsConstants";
  import axios from "axios";
  
  export const listDocs = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCS_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/docs`, config);
  
      dispatch({
        type: DOCS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DOCS_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const createDocAction = (title, content, category) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: DOCS_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(
        `/api/docs/create`,
        { title, content, category },
        config
      );
  
      dispatch({
        type: DOCS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DOCS_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  export const deleteDocAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCS_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`/api/docs/${id}`, config);
  
      dispatch({
        type: DOCS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DOCS_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updateDocAction = (id, title, content, category) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: DOCS_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(
        `/api/docs/${id}`,
        { title, content, category },
        config
      );
  
      dispatch({
        type: DOCS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: DOCS_UPDATE_FAIL,
        payload: message,
      });
    }
  };