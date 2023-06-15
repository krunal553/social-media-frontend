import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { postListReducer } from './reducers/postReducers';
import { userLoginReducer } from './reducers/userReducers';

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const preloadedState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore({
    reducer: {
        postList: postListReducer,
        userLogin: userLoginReducer,
    },
    preloadedState,
    middleware,
    devTools: true, // Enables Redux DevTools extension
});

export default store;
