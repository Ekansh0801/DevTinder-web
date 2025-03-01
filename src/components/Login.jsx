import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [email,setEmail] = useState("ekansh080103@gmail.com");
  const [password,setPassword] = useState("Swati_0108");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    try{
      const res = await axios.post(BASE_URL + '/login', {
        email,
        password
      },{withCredentials:true})

      dispatch(addUser(res.data.user))
      // console.log(res.data)

      navigate("/")
    } 
    catch(err){
      console.log(err);
    }     
  }
  return (
    <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">LOGIN</h2>
    
    <div>
      <fieldset className="fieldset my-2">
        <legend className="fieldset-legend">What's your Email?</legend>
        <input type="text" className="input" placeholder="Type here" value={email} onChange={(e) => (setEmail(e.target.value))}/>
      </fieldset>

      <fieldset className="fieldset my-2">
        <legend className="fieldset-legend">What's your Password?</legend>
        <input type="text" className="input" placeholder="Type here" value={password} onChange={(e) => (setPassword(e.target.value))}/>
      </fieldset>

    </div>

    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={(e) => (handleLogin(e))}>LOGIN</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login