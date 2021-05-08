import { combineReducers } from "@reduxjs/toolkit";

import designerReducer from "../features/designer/designerSlice";
import drawerReducer from "../features/drawer/drawerSlice";

const rootReducer = combineReducers({
  designer: designerReducer,
  drawer: drawerReducer,
});

export default rootReducer;
