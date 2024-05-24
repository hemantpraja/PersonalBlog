import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/authActions.js'
import authService from "../../appwrite/auth.js"



function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutUser = () => {
        authService.logout().then(() => {
            dispatch(logout())
        }).catch(() => {

        })
    }
    return (
        <button
            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
            onClick={logoutUser}
        >Logout</button>
    )
}

export default LogoutBtn