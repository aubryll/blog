import { combineReducers } from "@reduxjs/toolkit"
import postReducer from "./post/reducer"

const rootReducer = () => 
    combineReducers({
        posts: postReducer,
    
    })


export default rootReducer