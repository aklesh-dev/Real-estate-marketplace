import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signinFailure, signinStart, signinSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";


const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state)=> state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();      
      if (data.success === false) {
        dispatch(signinFailure(data.message));
        return;
      };
      dispatch(signinSuccess(data));
      navigate('/');

    } catch (error) {
      dispatch(signinFailure(error));
    }
  };

  return (
    <section className="max-w-6xl mx-auto p-3" aria-label="Sign Up Form">
      <h1 className="font-bold text-3xl text-center mt-5">Sign In</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-3 items-center mt-5 py-3">
        
        <div className="flex items-center bg-slate-200  lg:w-2/6 px-2 rounded-lg">
          <MdEmail aria-label="Email Icon" className="text-slate-600" />
          <input type="email"
            placeholder="Email"
            onChange={handleChange}
            id="email"
            className="p-2 w-[330px] bg-transparent rounded-lg focus:outline-none"
          />
        </div>
        <div className="flex items-center bg-slate-200  lg:w-2/6 px-2 rounded-lg">
          <RiLockPasswordFill aria-label="Password Icon" className="text-slate-600" />
          <input type="password"
            placeholder="Password"
            onChange={handleChange}
            id="password"
            className="p-2 w-[330px] bg-transparent rounded-lg focus:outline-none"
          />
        </div>

        <button
          disabled={loading}
          className="bg-slate-800 w-[330px] lg:w-2/6 p-2 text-white uppercase rounded-lg hover:opacity-90 disabled:opacity-80 w-">
          {loading ? 'signing..' : 'sign in'}
        </button>
        <OAuth/>
      </form>
      <div className="flex w-[330px] lg:w-2/6 mx-auto gap-3 mt-5">
        <span className="text-slate-700">Don't have an account ?</span>
        <Link to='/sign-up' className="hover:text-blue-600 ">
          Sign up
        </Link>
      </div>
      {
        error && <p className="text-red-600 w-[300px] mx-auto mt-4">{error}</p>
      }
    </section>
  )
}

export default SignIn