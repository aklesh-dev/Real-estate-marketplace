import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePer] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`;
    const stroageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(stroageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (err) => {
        setFileUploadErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL })
          })
          .catch((err) => {
            console.error('Error getting download URL:', err);
          })
      }
    );

  };

  return (
    <section className="h-2/4 md:w-2/4 mx-auto py-6 rounded-3xl bg-slate-200 mt-3">
      <h1 className="text-bold text-center text-2xl font-serif pt-2 ">Profile</h1>
      <form action="" className='flex flex-col mt-6 mb-7 gap-4 px-3 lg:px-0 lg:w-2/4 mx-auto'>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          alt="avatar"
          className="w-20 h-20 self-center cursor-pointer object-cover rounded-3xl hover:shadow-lg "
        />
        <p className='text-center'>
          {
            fileUploadErr
              ? <span className="text-red-700">Error Uploading Image (image must be less than 2mb)</span>
              : (filePer > 0 && filePer < 100
                ? <span className="text-blue-700 text-sm">{`Uploading ${filePer}%`}</span>
                : (filePer === 100 ? <span className='text-green-600'>Image uploaded successfully</span> : '')
              )
          }
        </p>
        <input defaultValue={currentUser.username} type="text" placeholder='Username' id='username' className='p-2 bg-slate-100 rounded-lg' />
        <input defaultValue={currentUser.email} type="email" placeholder='Email' id='email' className='p-2 bg-slate-100 rounded-lg' />
        <input defaultValue={currentUser.password} type="password" placeholder='Change Password' id='password' className='p-2 bg-slate-100 rounded-lg' />
        <button className="bg-slate-600 p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 text-white">update</button>
      </form>
      <div className="flex justify-between mt-5 px-3 lg:px-0 lg:w-2/4 mx-auto">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </section>
  )
}

export default Profile