import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;         //state is the reference to your Redux state, you should access status as initial state
            state.userData = action.payload.userData   //action has a payload property, and within the payload, there is a userData property. 
            //The data contained in action.payload.userData is used to update the userData property in the state.
        },
        logout: (state) => {
            state.status = false;
            state.userData = null
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer

//createSlice() method takes 3 arguments: 1-name:, 2-Initial State, 3-reducers
//reducer function takes 2 parameter 1-state and 2-action and return a new state
//const [state,dispatch]=useReducer(reducerFn, initial state )Hook used in functional componnet
//reducer fn is a ture function which only return new state
//in UI an event who dispatch trigger the action 
//action has 2 property type: and paylod:

//export const { login, logout } = authSlice.actions
//authSlice.actions: This is an object containing all the action creators generated by the createSlice function. 
//Each key in the object corresponds to a reducer function name.
//{ login, logout }: This is a destructuring assignment that extracts the login and logout properties from the authSlice.actions object.