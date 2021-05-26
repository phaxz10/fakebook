import { getProviders, getSession, signIn } from 'next-auth/client';
import React from 'react';
import styles from '../components/Signin.module.css';
import Image from 'next/image';

export default function SignIn({ providers }) {
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
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className={styles.button} onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

// This is the recommended way for Next.js 9.3 or newer

export async function getServerSideProps(context) {
  const { req, res } = context;
  const providers = await getProviders();
  const session = await getSession({ req });

  if (session) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
    return;
  }
  return {
    props: { providers },
  };
}
