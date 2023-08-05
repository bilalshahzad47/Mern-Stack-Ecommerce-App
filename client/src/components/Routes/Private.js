import React, {useState, useEffect} from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import Spinner from '../Spinner';

const PrivateRoute = () => {
    // eslint-disable-next-line no-unused-vars
    const [ok,setOk] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("/api/v1/auth/user-auth")
            if(res.data && res.data.ok) {
                setOk(true)
            }else{
                setOk(false)
            }       
        }
        if(auth?.token) authCheck()
    }, [auth?.token])
  return  <Outlet />
}

export default PrivateRoute;