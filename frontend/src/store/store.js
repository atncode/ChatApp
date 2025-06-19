import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth.slice'
import uiSlice from './ui'
import { api } from '../api'

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

export default store
