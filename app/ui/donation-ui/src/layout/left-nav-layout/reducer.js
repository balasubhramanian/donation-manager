export default (state = {}, action) => {
  switch (action.type) {
    case "CLEAR_MSG":
      return {};

    case "SUCCESS_MSG":
      return {
        type: "success",
        value: action.msg
      };

    case "ERROR_MSG":
      return {
        type: "error",
        value: action.msg
      };
    default:
      return state;
  }
};
