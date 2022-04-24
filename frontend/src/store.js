import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { docDeleteReducer, docListReducer, docsCreateReducer, docUpdateReducer } from './reducers/docReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  docList: docListReducer,
  docCreate: docsCreateReducer,
  docUpdate: docUpdateReducer,
  docDelete: docDeleteReducer,
  userUpdate: userUpdateReducer,
})

const userInfoFromStorage= localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null;
const initialState = {
  userLogin:{userInfo: userInfoFromStorage},
};

const middleware = [thunk];

const store= createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

);

export default store;