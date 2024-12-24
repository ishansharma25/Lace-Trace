import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';
import vehicles from '../assets/pgimg.jpg';

export default function Register() {
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        try {
            const { data: responseData } = await axios.post('/register', {
                name,
                email,
                password,
            });
            if (responseData.error) {
                toast.error(responseData.error);
            } else {
                login(responseData);
                setData({});
                toast.success('Registration Successful');
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred during registration');
        }
    };

    return (
        <div className='relative w-full h-screen bg-zinc-900/90'>
            <img className='absolute w-full h-full object-cover mix-blend-overlay' src={vehicles} alt="Background" />

            <div className='flex justify-center items-center h-full'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-8' onSubmit={registerUser}>
                    <div className="flex items-center justify-center py-4">
                        <img src="/shoe.svg" alt="Icon" className="animate-bounce w-8 h-8 mr-2" />
                        <h2 className="text-4xl font-bold">LaceTrace</h2>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Name</label>
                        <input
                            className='border relative bg-gray-100 p-2'
                            type="text"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Email</label>
                        <input
                            className='border relative bg-gray-100 p-2'
                            type="email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label>Password</label>
                        <input
                            className='border relative bg-gray-100 p-2'
                            type="password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                    </div>

                    <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white' type='submit'>REGISTER</button>
                    <div className='mt-4 flex justify-between items-center'>
                        <span>Already have an account?</span>
                        <label className='border relative bg-gray-100 p-2'>
                            <Link to="/login">Sign In</Link>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
}