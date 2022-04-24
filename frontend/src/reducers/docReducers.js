import {
    DOCS_UPDATE_REQUEST,
    DOCS_UPDATE_SUCCESS,
    DOCS_UPDATE_FAIL,
    DOCS_CREATE_FAIL,
    DOCS_CREATE_REQUEST,
    DOCS_CREATE_SUCCESS,
    DOCS_DELETE_FAIL,
    DOCS_DELETE_REQUEST,
    DOCS_DELETE_SUCCESS,
    DOCS_LIST_FAIL,
    DOCS_LIST_REQUEST,
    DOCS_LIST_SUCCESS,
  } from "../constants/docsConstants";
  
  export const docListReducer = (state = { docs: [] }, action) => {
    switch (action.type) {
      case DOCS_LIST_REQUEST:
        return { loading: true };
      case DOCS_LIST_SUCCESS:
        return { loading: false, docs: action.payload };
      case DOCS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const docsCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case DOCS_CREATE_REQUEST:
        return { loading: true };
      case DOCS_CREATE_SUCCESS:
        return { loading: false, success: true };
      case DOCS_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const docUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case DOCS_UPDATE_REQUEST:
        return { loading: true };
      case DOCS_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case DOCS_UPDATE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  export const docDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case DOCS_DELETE_REQUEST:
        return { loading: true };
      case DOCS_DELETE_SUCCESS:
        return { loading: false, success: true };
      case DOCS_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  
  