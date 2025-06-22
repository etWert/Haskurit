import { configureStore } from '@reduxjs/toolkit'
import apiSlice from './apiSlice'
import authReducer from '../features/auth/authSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production'
})
export default store