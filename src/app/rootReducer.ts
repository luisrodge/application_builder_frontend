import { combineReducers } from "@reduxjs/toolkit";

import applicationsReducer from "../features/applications/applicationsSlice";
import drawerReducer from "../features/drawer/drawerSlice";

const rootReducer = combineReducers({
  applications: applicationsReducer,
  drawer: drawerReducer,
});

export default rootReducer;
