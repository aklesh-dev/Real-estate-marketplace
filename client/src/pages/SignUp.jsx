import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      };
      setError(false);
      navigate('/sign-in');

    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <section className="max-w-6xl mx-auto p-3" aria-label="Sign Up Form">
      <h1 className="font-bold text-3xl text-center mt-5">Sign Up</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-3 items-center mt-5 py-3">
        <div className="flex items-center  lg:w-2/6 bg-slate-200 px-2 rounded-lg">
          <FaUserCircle className="text-slate-600" aria-label="Username Icon" />
          <input type="text"
            placeholder="Username"
            onChange={handleChange}
            id="username"
            className="p-2 w-[330px]  bg-transparent rounded-lg focus:outline-none"
          />
        </div>
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
          {loading ? 'signing..' : 'sign up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex w-[330px] lg:w-2/6 mx-auto gap-3 mt-5">
        <span className="text-slate-700">Already have an account ?</span>
        <Link to='/sign-in' className="hover:text-blue-600 ">
          Sign in
        </Link>
      </div>
      {
        error && <p className="text-red-600 w-[300px] mx-auto mt-4">{error}</p>
      }
    </section>
  )
}

export default SignUp;