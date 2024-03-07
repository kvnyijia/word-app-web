import { combineSlices } from "@reduxjs/toolkit";
import userLogin_reducer from "./feactures/login";
import rightSide_reducer from "./feactures/rightSide";

const root_reducer = combineSlices({
  userLogin_reducer,
  rightSide_reducer,  
})

export default root_reducer;
