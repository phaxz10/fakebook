import styled from 'styled-components';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/outline';
import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import firebase from 'firebase';
import ChatItems from './ChatItems';
import { useCollection } from 'react-firebase-hooks/firestore';

function Chat({ toggleChatWindow, session, chatMessages }) {
	const [realtimeChat] = useCollection(
		db.collection('chat').orderBy('timestamp', 'asc')
	);
	const [chatBubble, setChatBubble] = useState('');
	const inputRef = useRef(null);
	const chatBottom = useRef(null);

	const scrollToBottom = () => {
		chatBottom.current.scrollIntoView({
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		scrollToBottom();
	}, [realtimeChat]);

	const sendChat = (e) => {
		e.preventDefault();

		db.collection('chat').add({
			message: inputRef.current.value,
			name: session.user.name,
			avatar: session.user.image,
			email: session.user.email,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		scrollToBottom();
		inputRef.current.value = '';
	};

	return (
		<Container className='absolute bottom-0 right-[70px] rounded-t-md'>
			<ChatHeader className='shadow-lg flex justify-between'>
				<div className='flex items-center m-2'>
					<CheckCircleIcon className=' text-green-600 bg-green-600 rounded-full h-3' />
					<p className='font-medium text-sm pl-2'>All Chat!</p>
				</div>
				<div className='flex items-center pr-1'>
					<XIcon
						className='h-5 hover:text-red-500'
						onClick={toggleChatWindow}
					/>
				</div>
			</ChatHeader>
			<ChatBody className='mx-1 overflow-y-scroll'>
				{realtimeChat
					? realtimeChat.docs.map((chat) => (
							<ChatItems
								key={chat.id}
								message={chat.data().message}
								avatar={chat.data().avatar}
								user={chat.data().name}
								email={chat.data().email}
								timestamp={chat?.data().timestamp}
							/>
					  ))
					: chatMessages?.map((chat) => (
							<ChatItems
								key={chat.id}
								message={chat.message}
								avatar={chat.avatar}
								user={chat.name}
								email={chat.email}
							/>
					  ))}
				<div ref={chatBottom} />
			</ChatBody>
			<ChatInput className='mx-1'>
				<form className='flex flex-1 p-1'>
					<input
						ref={inputRef}
						type='text'
						placeholder='Type here...'
						className='flex-grow rounded-md h-12 p-3 outline-none'
					/>
					<button hidden type='submit' onClick={sendChat}>
						submit
					</button>
				</form>
			</ChatInput>
		</Container>
	);
}

export default Chat;

const Container = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto 1fr auto;
	grid-template-areas:
		'header'
		'body'
		'input';
	grid-column: 1;
	height: 400px;
	width: 330px;
	background-color: white;
`;
const ChatHeader = styled.div`
	height: 40px;
	grid-area: header;
`;

const ChatBody = styled.div`
	grid-area: body;
	background-color: rgb(200, 200, 250, 0.2);
`;

const ChatInput = styled.div`
	grid-area: input;
	background-color: lightgray;
`;
