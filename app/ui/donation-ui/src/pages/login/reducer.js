import * as type from "./types";

/*
TODO: revist accessing local storage from reducer
 */
export default (state = {}, action) => {
  switch (action.type) {
    case type.LOGIN:
      return {
        isLoading: true,
        isLoggedIn: false,
        errorMessage: null
      };
    case type.LOGIN_SUCCESSFUL:
      const authData = {
        isLoading: false,
        isLoggedIn: true,
        user: action.data
      };
      localStorage.setItem("user", JSON.stringify(authData));
      return authData;
    case type.LOGIN_FAILED:
      return {
        isLoading: false,
        isLoggedIn: false,
        errorMessage: action.error.msg
      };
    case type.LOGOUT:
      localStorage.setItem("user", null);
      return {
        isLoggedIn: false
      };

    default:
      return state;
  }
};
