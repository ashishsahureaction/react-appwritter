import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"

const store = configureStore({
    reducer: {
        auth: authSlice,

    }
})

export default store

//Store is just JS Object where all the state of the app store in key-value pair.
//createStore(reducer) is method in redux library who takes all the reducers as argument
//configureStore(reducer) method in redux toolkit where  reducer: {name given to reducer as per authslice : reducer method} i key-value pair.
//react-redux provide Provider element for wrapping the store inside any component