import { useSession } from 'next-auth/client';
import Post from './Post';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

function Posts() {
  const [session, loading] = useSession();
  const [postsFromDB, postloading, error] = useCollection(
    db.collection('posts').orderBy('timestamp', 'desc')
  );


  return (
    <div className=' pb-28'>
      {postsFromDB?.docs?.map((posts) => (
        <Post
          key={posts.id}
          userImage={session.user.image}
          message={posts.data().message}
          posterName={posts.data().name}
          posterImage={posts.data().avatar}
          timestamp={posts.data().timestamp}
          postImage={posts.data().postImage}
        />
      ))}
    </div>
  );
}

export default Posts;
