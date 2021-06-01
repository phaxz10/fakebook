import Head from 'next/head';
import Header from '../components/Header';
import { getSession, signIn } from 'next-auth/client';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widget from '../components/Widget';
import Chat from '../components/Chat';
import { PencilAltIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { db } from '../firebase';
// import Login from '../components/Login';

export default function Home({ session, chatMessages }) {
  const [chatWindow, setChatWIndow] = useState(false);
  const toggleChatWindow = () => {
    setChatWIndow(!chatWindow);
  };

  if (!session) {
    // return <Login />;
    signIn();

    return <></>;
  }
  return (
    <div className='h-screen overflow-visible overflow-y-hidden bg-gray-100'>
      <Head>
        <title>Clone</title>
        <meta name='description' content='This is a clone app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* header */}
      <div className='sticky top-0 bg-white z-50'>
        <Header toggleChatWindow={toggleChatWindow} />
      </div>

      <main className='flex overflow-y-scroll'>
        {/* sidebar */}
        <Sidebar />
        {/* body */}
        <Feed />
        {/* right side */}
        <Widget />
        {/* chat */}
        {chatWindow && (
          <Chat
            chatMessages={chatMessages}
            session={session}
            toggleChatWindow={toggleChatWindow}
          />
        )}
      </main>
      <PencilAltIcon
        onClick={toggleChatWindow}
        className='h-14 rounded-full bg-gray-400 hover:bg-gray-600 text-white p-4 hidden md:flex absolute right-2 bottom-2'
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const chatMessages = await db
    .collection('chat')
    .orderBy('timestamp', 'asc')
    .get();

  const chatData = chatMessages.docs.map((data) => ({
    id: data.id,
    ...data.data(),
    timestamp: null,
  }));

  return {
    props: {
      session,
      chatMessages: chatData,
    }, // will be passed to the page component as props
  };
}
