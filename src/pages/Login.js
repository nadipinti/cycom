import React from "react";
import Form from "react-bootstrap/Form"; 
// import 'boxicons'

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import {login } from '../redux/reducers/auth'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function  Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const accessToken = useSelector((state)=> state.auth.accessToken)
  const userLogin = async (event) => {
  event.preventDefault();
  
  const payload = {
    login_type: 'email',
    password: password,
    username: username,
  }
  dispatch(login(payload))
  navigate('/')
  console.log('---------------------------------------------------------------')
  localStorage.setItem('userData',JSON.stringify({name: 'saipavan'}))
   
}
  console.log('responseData.current_organization',accessToken)
  return ( 
    <div className="wrapper">
       <ToastContainer />
      <div className="container-fluid">
        <div className="row d-flex align-items-center justify-content-center h-100vh">
          <div className='col-3 col-md-3'>
            <div className="card login-card border-0">
                {/* <div className="logo text-center">
                  <i className='bx bxs-cloud'></i>
                </div> */}
                <h1>Sign In</h1>
                {/* <div>{accessToken}</div>
                {accessToken!==undefined ? <div>{accessToken}</div>: 'No Data Fount'} */}
                <Form onSubmit={userLogin}>
                  <Form.Group size="lg" controlId="email">
                    <div className="formgroup">
                      <Form.Label>Email/Username</Form.Label>
                      <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value)}}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group size="lg" controlId="password">
                    <div className="formgroup">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        required={true}
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                      />
                    </div>
                  </Form.Group>

                  <div className="formgroup">                    
                    <Button className="btn login-btn" size="lg" type="submit">Sign In</Button>
                  </div>
                </Form>

                
                
                {/* <div className="d-flex align-items-center justify-content-between mb-15">
                  <div className="remember form-check d-flex align-items-center">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    <label className="form-check-label" for="flexCheckDefault">Remember Me</label>
                  </div>
                  
                  <div className="forgotlink">
                    <a href="#">forgot password</a>
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}