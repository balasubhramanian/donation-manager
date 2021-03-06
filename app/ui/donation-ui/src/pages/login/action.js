import UserService from "services/user-service";
import { history } from "store";
import * as type from "./types";

export function login(username, password) {
  return dispatch => {
    dispatch(loginStart());
    UserService.login(username, password)
      .then(response => {
        dispatch(loginSuccess(response.data));
        history.push("/");
      })
      .catch(response => {
        if (!response.response) {
          dispatch(loginFailed("Network Error"));
        } else {
          dispatch(loginFailed("Invalid username or password"));
        }
      });
  };
}

export function loginFailed(error) {
  return { type: type.LOGIN_FAILED, error: error };
}
function loginStart() {
  return { type: type.LOGIN };
}

function loginSuccess(data) {
  return { type: type.LOGIN_SUCCESSFUL, data: data };
}
