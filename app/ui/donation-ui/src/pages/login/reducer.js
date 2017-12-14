import * as type from './types'
export default (state = {}, action) => {
  switch (action.type) {
    case type.LOGIN:
      return {
        ...state,
        isLoading: true,
        isLoggedIn : false,
        errorMessage: {}
      };
    case type.LOGIN_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true
      };
    case type.LOGIN_FAILED:
      return {
        isLoading: false,
        isLoggedIn: false,
        errorMessage: action.error.msg
      };
    case type.LOGOUT:
      return {
        isLoggedIn: false
      };

    default:
      return state;
  }
};
