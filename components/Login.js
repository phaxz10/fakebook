// import { signIn } from 'next-auth/client';
// import React from 'react';

// function Login() {
//   return (
//     <div className=' grid place-items-center'>
//       <h1>this is login</h1>
//       <p className='bg-blue-400 p-5 text-center' onClick={signIn}>
//         sign in click here
//       </p>
//     </div>
//   );
// }

// export default Login;

import { getProviders, getSession, signIn } from 'next-auth/client';
import React, { useEffect } from 'react';
import styles from '../components/Signin.module.css';
import Image from 'next/image';

function Login() {
  let redirectUrl = 'https://location:3000';

  useEffect(() => {
    const url = new URL(location.href);
    redirectUrl = url.searchParams.get('callbackUrl');
  });

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <Image
          src='https://links.papareact.com/5me'
          width={200}
          height={200}
          layout='fixed'
        />
      </div>
      {/* {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className={styles.button}
            onClick={() => signIn(provider.id, { callbackUrl: redirectUrl })}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))} */}
      <div>
        <button
          className={styles.button}
          onClick={() => signIn('facebook', { callbackUrl: redirectUrl })}
        >
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}

export default Login;

// This is the recommended way for Next.js 9.3 or newer
