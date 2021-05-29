import { combineReducers } from "@reduxjs/toolkit";

import applicationsReducer from "../features/applications/applicationsSlice";
import applyReducer from "../features/apply/applySlice";
import drawerReducer from "../features/drawer/drawerSlice";
import modalReducer from "../features/modal/modalSlice";

const rootReducer = combineReducers({
  applications: applicationsReducer,
  apply: applyReducer,
  drawer: drawerReducer,
  modal: modalReducer,
});

export default rootReducer;
