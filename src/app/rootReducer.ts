import { combineReducers } from "@reduxjs/toolkit";

import designerReducer from "../features/designer/designerSlice";

const rootReducer = combineReducers({
  designer: designerReducer,
});

export default rootReducer;
