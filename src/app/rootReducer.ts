import { combineReducers } from "@reduxjs/toolkit";

import applicationReducer from "../features/application/applicationSlice";
import drawerReducer from "../features/drawer/drawerSlice";

const rootReducer = combineReducers({
  application: applicationReducer,
  drawer: drawerReducer,
});

export default rootReducer;
