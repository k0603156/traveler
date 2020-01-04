import { combineReducers } from "redux";
import auth from "./Auth/reducers";
import authSaga from "./Auth/saga";
import user from "./User/reducers";
import userSaga from "./User/saga";
import loading from "./Loading";

import { all } from "redux-saga/effects";

const rootReducer: any = combineReducers<RootStateType>({
  auth,
  user,
  loading
});
export default rootReducer;
export function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}
