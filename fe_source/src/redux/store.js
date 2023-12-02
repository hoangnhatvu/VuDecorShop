import {configureStore} from '@reduxjs/toolkit';
import isCheckAllReducer from './slices/isCheckAll.slice';
import listOrderItemReducer from './slices/listOrderItem.slice';

const store = configureStore({
  reducer: {
    isCheckAll: isCheckAllReducer,
    listOrderItem: listOrderItemReducer,
  },
});

export default store;
