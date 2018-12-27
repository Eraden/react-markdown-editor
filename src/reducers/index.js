import { combineReducers } from "redux";

import content   from './content';
import selection from "./selection";
import tabs      from "./tabs";

export default combineReducers({
    content,
    selection,
    tabs,
});
