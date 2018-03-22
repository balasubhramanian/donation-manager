import { createStore, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import rootReducer from './reducer'
import logger from 'redux-logger'



export const history = createHistory()

const initialState = {
  auth : {

  },
  globalMsg : {
    type : null,
    value : null
  }
}

if(localStorage.getItem('user')){
  initialState.auth = JSON.parse(localStorage.getItem('user'));
}

const enhancers = []
const middleware = [
  logger,
  thunk,
  routerMiddleware(history)
]

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store



