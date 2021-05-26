import { useSession } from 'next-auth/client';
import StoryCard from './StoryCard';
import { stories } from './storiesList';

function Stories() {
	const [session, loading] = useSession();
	return (
		<div className='flex justify-center p-4'>
			{/* <StoryCard
        src={stories[0].src}
        profile={stories[0].profile}
        name={stories[0].name}
      />
      <StoryCard
        src={stories[1].src}
        profile={stories[1].profile}
        name={stories[1].name}
      /> */}
			<StoryCard create src={session.user.image} name={session.user.name} />

			{stories.map((data, index) => (
				<StoryCard
					key={index}
					src={data.src}
					profile={data.profile}
					name={data.name}
				/>
			))}
		</div>
	);
}

export default Stories;
