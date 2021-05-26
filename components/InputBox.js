import { useSession } from 'next-auth/client';
import Image from 'next/image';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { useRef, useState } from 'react';
import { db, storage } from '../firebase';
import firebase from 'firebase';
import { XCircleIcon } from '@heroicons/react/solid';
import { toast, ToastContainer } from 'react-nextjs-toast';

function InputBox() {
  const [session, loading] = useSession();
  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  const notifySuccess = () => {
    toast.notify('Upload Complete', {
      duration: 5,
      title: 'Nice',
      type: 'success',
    });
  };
  const notifyFail = () => {
    toast.notify('Error Uploading', {
      duration: 5,
      title: 'Meh..',
      type: 'error',
    });
  };

  const sendPost = (e) => {
    e.preventDefault();

    if (!inputRef.current.value) return;

    db.collection('posts')
      .add({
        message: inputRef.current.value,
        name: session.user.name,
        avatar: session.user.image,
        email: session.user.email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTask = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, 'data_url');

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (err) => {
              console.error('THIS ERROR: ', err);
              notifyFail();
            },
            () => {
              console.log('upload completed!');
              notifySuccess();
              removeImageToPost();
              storage
                .ref('posts')
                .child(doc.id)
                .getDownloadURL()
                .then((downloadURL) => {
                  db.collection('posts').doc(doc.id).set(
                    {
                      postImage: downloadURL,
                    },
                    { merge: true }
                  );
                });
            }
          );
        }
      });

    inputRef.current.value = '';
  };

  const addImgToPost = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImageToPost = () => {
    setImageToPost(null);
  };

  return (
    <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-4 md:mt-6'>
      <div className='flex space-x-4 p-4 items-center'>
        <Image
          className='rounded-full'
          src={session.user.image}
          width={40}
          height={40}
          layout='fixed'
        />
        <form className='flex flex-1'>
          <input
            ref={inputRef}
            className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
            type='text'
            placeholder={`What's on your mind?`}
          />
          <button hidden type='submit' onClick={sendPost}>
            submit
          </button>
          {imageToPost && (
            <div className='ml-2 relative'>
              <img
                src={imageToPost}
                className='object-contain max-h-[48px] max-w-[48px]'
              />
              <XCircleIcon
                onClick={removeImageToPost}
                className='w-5 absolute -top-2 -right-2 z-40 text-black bg-white rounded-full transform hover:scale-110'
              />
            </div>
          )}
        </form>
      </div>
      <hr />
      <div className='flex p-2'>
        <div className='inputBoxDiv'>
          <VideoCameraIcon className='inputBoxIcon text-red-500 ' />{' '}
          <p className='inputBoxText'>Live Video</p>
        </div>
        <div
          className='inputBoxDiv'
          onClick={() => filePickerRef.current.click()}>
          <CameraIcon className='inputBoxIcon text-green-500' />{' '}
          <p className='inputBoxText'>Photo/Video</p>
          <input
            hidden
            ref={filePickerRef}
            type='file'
            accept='image/*'
            onChange={addImgToPost}
          />
        </div>
        <div className='inputBoxDiv'>
          <EmojiHappyIcon className='inputBoxIcon text-yellow-500' />{' '}
          <p className='inputBoxText'>Feeling/Activity</p>
        </div>
      </div>
      <ToastContainer align={'right'} position={'bottom'} className='z-50'/>
    </div>
  );
}

export default InputBox;
