import React from 'react'
import { useAuth } from '../Context/AuthContext'


function Test() {
    const {authuser, isloggedin } = useAuth()
    return (
    <div>{authuser}</div>
  )
}

export default Test