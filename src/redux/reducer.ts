import { combineSlices } from "@reduxjs/toolkit";
import userLogin_reducer from "./feactures/login";

const root_reducer = combineSlices({
  userLogin_reducer,
})

export default root_reducer;
