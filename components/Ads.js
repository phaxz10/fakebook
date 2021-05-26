import Image from 'next/image';

function Ads({ image, title, shortDesc, link }) {
  return (
    <a href={link} target='blank'>
      <div className='p-2 bg-white rounded-md mt-[10px]'>
        <div className='flex-1 transition delay-75 duration-300 ease-in-out transform hover:scale-105 '>
          <Image
            src={image}
            width={150}
            height={100}
            objectFit='contain'
            layout='fixed'
          />{' '}
        </div>
        <div className='flex-1 p-2 items-center'>
          <p className='font-medium text-base'>{title}</p>
          <p className='text-sm font-light'>{shortDesc}</p>
        </div>
      </div>
    </a>
  );
}

export default Ads;
