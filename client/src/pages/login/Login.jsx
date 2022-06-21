import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './login.css'

const Login = () => {
  const [ credentials, setCredentials ] = useState({
    username:  undefined,
    password: undefined
  })

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleChange = e => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  const handleClick = async e => {
      e.preventDefault();
      dispatch({type: "LOGIN_START"});

      try {
        
        const res = await axios.post("/auth/login", credentials);
        if(!res.data.type) dispatch({type: "LOGIN_FAIL", payload: res.data.message});
        else {
          dispatch({type: "LOGIN_SUCCESS", payload: res.data.data})
          navigate('/');
        }
        
      } catch (err) {
        dispatch({type: "LOGIN_FAIL", payload: err.response.data.message});
      }
  }

  return (
    <div className='login'>
      <div className="lContainer">
        <input type="text" placeholder='username' id='username' onChange={handleChange} className="lInput" />
        <input type="password" placeholder='password' id='password' onChange={handleChange} className="lInput" />
        <button disabled={loading} className='lButton' onClick={handleClick}>Login</button>
        {error && <span> { error } </span>}
      </div>
    </div>
  )
}

export default Login;