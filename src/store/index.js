import {createStore} from "redux";
import {tripReducer} from "./tripReducer";

export const store = createStore(tripReducer);