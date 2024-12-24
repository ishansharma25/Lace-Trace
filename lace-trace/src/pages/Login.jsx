import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import vehicles from '../assets/pgimg.jpg';

export default function Login() {
    const navigate = useNavigate();
    const { user,login } = useContext(UserContext);
    const [data, setData] = useState({
        email: '',
        password: '',
    });
   if(user)
   {
   
            navigate('/streamlit');
   }
    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const success = await login({ email, password });
            if (success) {
                setData({});
                toast.success('Login Successful');
                navigate('/streamlit');
            } else {
                toast.error('Invalid email or password');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred during login');
        }
    };

    return (
        <div className='relative w-full h-screen bg-zinc-900/90'>
            <img className='absolute w-full h-full object-cover mix-blend-overlay' src={vehicles} alt="/" />

            <div className='flex justify-center items-center h-full'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-8' onSubmit={loginUser}>
                    <div className="flex items-center justify-center py-4">
                        <img src="/shoe.svg" alt="Icon" className="animate-bounce w-8 h-8 mr-2" />
                        <h2 className="text-4xl font-bold justify-center">LaceTrace</h2>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Email</label>
                        <input className='border relative bg-gray-100 p-2'
                            type="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label>Password</label>
                        <input className='border relative bg-gray-100 p-2'
                            type="password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    </div>
                    <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white' type='submit'>Sign In</button>

                    <div className='mt-4 flex justify-between items-center'>
                        <span>Don't have an account?</span>
                        <label className='border relative bg-gray-100 p-2'>
                            <Link to="/register">Sign Up</Link>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
}