import React, {useState} from 'react'
import Layout from './../../components/Layout/Layout';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth();
    const location = useLocation();
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password})
          if(res && res.data.success){
            toast.success(res.data && res.data.message)
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
              });
              localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || '/')
          }else{
            toast.error(res.data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error("Something Went Wrong");
        }
    }
  return (
    <Layout title="Login - Ecommer App">
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h4 className='title'>Login Form</h4>
  
  <div className="mb-3">
    <input type="email" className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' 
     value={email} onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div className="mb-3">
    <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter Your Password'
     value={password} onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <div className='mb-3'>
  <button type="submit" className="btn btn-primary" onClick={() => navigate("/forgot-password")}>Forgot Password</button>
  </div>
  <button type="submit" className="btn btn-primary">Login</button>
</form>

      </div>
    </Layout>
  )
}

export default Login
