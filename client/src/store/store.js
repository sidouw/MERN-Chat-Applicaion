import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './Reducers/chatReducer'
import userReducer from './Reducers//userReducer'

export default configureStore({
  reducer: {
    chat: chatReducer,
    user: userReducer,
  },
});
