import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const SignOut = () => {
  return (
    <section className="max-w-6xl mx-auto p-3">
      <h1 className="font-bold text-3xl text-center mt-5">Sign Up</h1>
      <form action="" className=" flex flex-col gap-3 items-center mt-5 py-3">
        <div className="flex items-center w-[330px] lg:w-2/6 bg-slate-200 px-2 rounded-lg">
          <FaUserCircle className="text-slate-600" />
          <input type="text"
            placeholder="Username"
            className="p-2  bg-transparent rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex items-center bg-slate-200 w-[330px] lg:w-2/6 px-2 rounded-lg">
          <MdEmail className="text-slate-600" />
          <input type="text"
            placeholder="Email"
            className="p-2 bg-transparent rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex items-center bg-slate-200 w-[330px] lg:w-2/6 px-2 rounded-lg">
          <RiLockPasswordFill className="text-slate-600" />
          <input type="text"
            placeholder="Password"
            className="p-2 bg-transparent rounded-lg focus:outline-none"
          />
        </div>

        <button
          className="bg-slate-800 w-[330px] lg:w-2/6 p-2 text-white uppercase rounded-lg hover:opacity-90 disabled:opacity-80 w-">
          sign up
        </button>
      </form>
      <div className="flex w-[330px] lg:w-2/6 mx-auto gap-3 mt-5">
        <span className="text-slate-700">Already have an account ?</span>
        <Link to='/sign-in' className="hover:text-blue-600 ">
          Sign in
        </Link>
      </div>
    </section>
  )
}

export default SignOut