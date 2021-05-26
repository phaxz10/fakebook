import Image from 'next/image';
import { ThumbUpIcon, AnnotationIcon, ShareIcon } from '@heroicons/react/solid';

function Post({
  message,
  posterName,
  posterImage,
  timestamp,
  postImage,
  userImage,
}) {
  const postDate = new Date(timestamp?.toDate()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
  return (
    <div className='bg-white  rounded-2xl shadow-md mt-4 md:mt-6'>
      <div className='flex space-x-4 p-4 items-center flex-1'>
        <Image
          className='rounded-full'
          src={posterImage}
          width={30}
          height={30}
          layout='fixed'
        />
        <div>
          <p className='text-sm font-medium'>{posterName}</p>
          <p className='text-gray-500 text-xs'>{postDate && postDate}</p>
        </div>
      </div>
      <div className=' px-16'>
        <p>{message}</p>
      </div>

      {postImage && (
        <div className='relative h-56 md:h-96 bg-white my-3'>
          <Image
            src={postImage}
            objectFit='cover'
            objectPosition='center center'
            layout='fill'
          />
        </div>
      )}
      {/* <img src={postImage} alt='imagePost' /> */}

      <hr className=' mt-5' />
      <div className='flex p-1 text-gray-400 '>
        <div className='inputBoxDiv hover:text-blue-400'>
          <ThumbUpIcon className='inputBoxIcon ' />
          <p className='inputBoxText'>Like</p>
        </div>
        <div className='inputBoxDiv hover:text-blue-400'>
          <AnnotationIcon className='inputBoxIcon' />
          <p className='inputBoxText'>Comment</p>
        </div>
        <div className='inputBoxDiv hover:text-blue-400'>
          <ShareIcon className='inputBoxIcon' />
          <p className='inputBoxText'>Share</p>
        </div>
      </div>
      <hr />
      <div>
        {/* add comment part */}
        <div className='flex space-x-4 p-4 items-center flex-1'>
          <Image
            className='rounded-full'
            src={userImage}
            width={30}
            height={30}
            layout='fixed'
          />
          <input
            className='rounded-full h-10 bg-gray-100 flex-grow px-5 focus:outline-none'
            type='text'
            placeholder={`Write a comment...`}
          />
        </div>
      </div>
    </div>
  );
}

export default Post;
