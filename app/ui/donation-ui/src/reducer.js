import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import auth from 'pages/login/reducer'
import globalMsg from 'layout/left-nav-layout/reducer'

export default combineReducers({
  routing: routerReducer,
  auth,
  globalMsg
})