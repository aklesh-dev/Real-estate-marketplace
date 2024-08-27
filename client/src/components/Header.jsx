import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);

    
    return (
        <header className='bg-slate-100'>
            <nav aria-label='Main navigation'
                className='px-5 py-3 flex flex-wrap justify-between items-center shadow-md sticky top-0'
            >
                <Link to='/' className='flex items-center gap-2'>
                    <img src={logo} alt='Estate-logo' className='w-[50px] h-[50px] rounded-tl-xl rounded-br-2xl object-cover shadow-sm' />
                    <h1 className='text-2xl font-semibold text-slate-600'>Estate</h1>
                </Link>
                <form aria-label='Search form' className='bg-slate-300 rounded-full p-2 flex items-center px-3' >
                    <input type="text" placeholder='search...' name="" id=""
                        className='bg-transparent focus:outline-none w-24 sm:w-60'
                        aria-label='Search input'
                    />
                    <IoSearch aria-hidden='true' className='text-slate-600' />
                </form>
                <ul className='flex items-center gap-6'>
                    <li className='font-semibold hover:underline decoration-2 decoration-dashed decoration-slate-400 p-2 rounded-full transition-all ease-linear'>
                        <Link to="/" aria-label='Go to home page'>Home</Link>
                    </li>
                    <li className='font-semibold hover:underline decoration-2 decoration-dashed decoration-slate-500  p-2 rounded-full transition-all ease-linear'>
                        <Link to="/about" aria-label='Learn more about us'>About</Link>
                    </li>
                    <li >
                        <Link to="/profile" aria-label='Go to profile page'>
                            {currentUser ? (
                                <img src={currentUser.avatar} alt="user-img" className='w-7 h-7 rounded-full object-cover' />
                            ) : (
                                <div
                                    className='font-semibold hover:underline decoration-2 decoration-dashed decoration-sky-400  p-2 rounded-full transition-all ease-linear'
                                >Sign In</div>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
