import { combineReducers } from "redux";
import covids from './covidReducer'
const rootReducer = combineReducers({
    covids
})

export default rootReducer;