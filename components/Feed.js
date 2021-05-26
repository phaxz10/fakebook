import InputBox from './InputBox';
import Posts from './Posts';
import Stories from './Stories';

function Feed() {
  return (
    <div className='flex flex-grow flex-col h-screen pb-44 pt-6 pr-12'>
      <div className='mx-auto max-w-md md:max-w-lg lg:max-w-2xl'>
        {/* stories */}
        <Stories />

        {/* create post */}
        <InputBox />

        {/* posts list */}
        <Posts />
      </div>
    </div>
  );
}

export default Feed;
