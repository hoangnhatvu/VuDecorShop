import {configureStore} from '@reduxjs/toolkit';
import isCheckAllReducer from './slices/isCheckAll.slice';
import listOrderItemReducer from './slices/listOrderItem.slice';
import userInfoReducer from './slices/userInfo.slice'
import optionProductReducer from './slices/optionProduct.slice'

const store = configureStore({
  reducer: {
    isCheckAll: isCheckAllReducer,
    listOrderItem: listOrderItemReducer,
    userInfo: userInfoReducer,
    optionProduct: optionProductReducer,
  },
});

export default store;
