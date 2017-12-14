import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from 'pages/login/reducer'

export default combineReducers({
  routing: routerReducer,
  auth
})