import { combineReducers } from "redux";
import auth from "../state/user_reducer";
import cart from "../state/cart_reducer";

export default combineReducers({
  auth,
  cart,
});
