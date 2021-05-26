import Ads from './Ads';
import { ads } from './storiesList';

function Widget() {
	return (
		<div className='hidden md:inline min-w-[200px] w-[200px] p-2 mt-5'>
			<p className='p-2 font-medium'>My Other Projects</p>
			{ads.map((items, index) => (
				<div>
					<Ads
						key={index}
						title={items.title}
						shortDesc={items.shortDesc}
						image={items.image}
						link={items.link}
					/>
					<hr />
				</div>
			))}
		</div>
	);
}

export default Widget;
