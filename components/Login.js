import { signIn } from 'next-auth/client';
import React from 'react';

function Login() {
  return (
    <div className=' grid place-items-center'>
      <h1>this is login</h1>
      <p className='bg-blue-400 p-5 text-center' onClick={signIn}>
        sign in click here
      </p>
    </div>
  );
}

export default Login;
