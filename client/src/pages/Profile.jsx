import { useSelector } from 'react-redux';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section className="h-2/4 w-2/4 mx-auto py-6 rounded-3xl bg-slate-200 mt-3">
      <h1 className="text-bold text-center text-2xl font-serif pt-2 ">Profile</h1>
      <form action="" className='flex flex-col mt-6 mb-7 gap-4 w-2/4 mx-auto'>
        <img
          src={currentUser.avatar}
          alt="avatar"
          className="w-20 h-20 self-center cursor-pointer object-cover rounded-3xl hover:shadow-lg "
        />
        <input defaultValue={currentUser.username} type="text" placeholder='Username' id='username' className='p-2 bg-slate-100 rounded-lg' />
        <input defaultValue={currentUser.email} type="email" placeholder='Email' id='email' className='p-2 bg-slate-100 rounded-lg' />
        <input defaultValue={currentUser.password} type="password" placeholder='Change Password' id='password' className='p-2 bg-slate-100 rounded-lg' />
        <button className="bg-slate-600 p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 text-white">update</button>
      </form>
      <div className="flex justify-between mt-5 w-2/4 mx-auto">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Sign Out</span>
      </div>
    </section>
  )
}

export default Profile