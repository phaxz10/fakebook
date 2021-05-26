import Image from 'next/image';

function ChatItems({ short, user, avatar, timestamp, message }) {
	const chatDate = timestamp
		? new Date(timestamp?.toDate()).toUTCString()
		: 'loading...';
	return (
		<div className='p-2'>
			{!short && (
				<div className={`flex items-center`}>
					{avatar && (
						<Image
							src={avatar}
							height={28}
							width={28}
							layout='fixed'
							className='rounded-full'
						/>
					)}
					<div className='ml-2'>
						<p className='text-base font-medium'>{user}</p>
						<p className='text-gray-500 text-xs'>{chatDate}</p>
					</div>
				</div>
			)}
			<p className='flex p-2 bg-blue-100 flex-1 rounded-xl mt-1 ml-7'>
				{message}
			</p>
		</div>
	);
}

export default ChatItems;
