import React from 'react'
import { useState, useEffect } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import Spinner from '../Spinner';

export default function AdminRoute(){
    
    // eslint-disable-next-line no-unused-vars
    const [auth,setAuth] = useAuth();
    // eslint-disable-next-line no-unused-vars
    const [ok,setOk] = useState(false);

    useEffect(() => {
        const authCheck = async() => {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/admin-auth`)
            if(res.data.ok) {
                setOk(true)
            }else{
                setOk(false)
            }       
        }
        if(auth?.token) authCheck()
    }, [auth?.token])
  return <Outlet/>
}
