import React from 'react'
import {useDispatch} from "react-redux"
import authService from "../../appwrite/auth.js"
import {logout } from "../../store/authSlice.js"

function LogoutBtn() {
    const dispatch = useDispatch()

    const lougoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout());
        })
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={lougoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn

//LogoutHandler: Function to handle the logout process. It calls authService.logout() (assuming it returns a Promise) and, 
//upon successful logout, dispatches the logout action using dispatch(logout()).