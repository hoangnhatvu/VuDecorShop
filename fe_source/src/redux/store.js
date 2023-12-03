import {configureStore} from '@reduxjs/toolkit';
import isCheckAllReducer from './slices/isCheckAll.slice';
import listOrderItemReducer from './slices/listOrderItem.slice';
import userInfoReducer from './slices/userInfo.slice'

const store = configureStore({
  reducer: {
    isCheckAll: isCheckAllReducer,
    listOrderItem: listOrderItemReducer,
    userInfo: userInfoReducer,
  },
});

export default store;
