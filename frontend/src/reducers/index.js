import { combineReducers } from "redux";
import auth from "../state/user_reducer";
import cart from "../state/index";

export default combineReducers({
  auth,
  cart,
});
