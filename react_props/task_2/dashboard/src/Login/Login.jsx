import React from 'react'
import './Login.css'

export default function Login() {
  return (
    <div className='App-body'>
        <p>Login to access the full dashboard</p>
        <label htmlFor='email' className='email'>
          Email:
        </label>
        <input id='email' type='email'/>
        <label className='password'>
          Password: 
        </label>
        <input type='password'/>
        <button className='label-button'>OK</button>
      </div>
  );
}
