import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducer'

export default configureStore({
  reducer: {
    user: loginReducer
  }
})