import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

let middleWare = [logger, thunk]

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleWare)))
