import { combineReducers } from "redux";

import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import postsReducer from "./posts.reducer";

export default combineReducers({
    userReducer,
    usersReducer,
    postsReducer
});