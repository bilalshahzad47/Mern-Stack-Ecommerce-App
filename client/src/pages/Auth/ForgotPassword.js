import React, {useState} from 'react'
import Layout from './../../components/Layout/Layout';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../styles/AuthStyles.css";


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email, newPassword, answer});
          if(res && res.data.success){
            toast.success(res.data && res.data.message)
            navigate("/login")
          }else{
            toast.error(res.data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error("Something Went Wrong");
        }
    }
  return (
    <Layout title={'Forgot Password - Ecommer App'}>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <h4 className='title'>Reset Password</h4>
  
  <div className="mb-3">
    <input type="email" className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' 
     value={email} onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputAnswer" placeholder='Enter Your favourite Sport Name' 
     value={answer} onChange={(e) => setAnswer(e.target.value)}
    />
  </div>
  <div className="mb-3">
    <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter Your Password'
     value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
    />
  </div>
  <button type="submit" className="btn btn-primary">Reset</button>
</form>

      </div>
    </Layout>
  )
}

export default ForgotPassword
