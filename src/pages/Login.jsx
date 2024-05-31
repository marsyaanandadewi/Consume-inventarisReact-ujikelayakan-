import React, { useState } from "react";
import Navbar from '../components/Navbar';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
    });

    const [errorData, setErrorData] = useState([]);
    const navigate = useNavigate();

    function handleLogin() {
        axios.post('http://localhost:8000/login', inputData)
            .then(res => {
                localStorage.setItem('access_token', res.data.data.access_token);
                navigate('/profile');
            })
            .catch(err => {
                setErrorData(err.response.data);
            });
    }

    return (
        <>
            <Navbar />

            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="bg-blue-100 shadow-md rounded-lg p-8 max-w-sm w-full">
                    <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                    {Object.keys(errorData).length > 0 && (
                        <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Danger</span>
                            <div>
                                <span className="font-medium">Gagal Login :( </span>
                                <ul className="mt-1.5 list-disc list-inside">
                                    {Object.entries(errorData).map(([index, value]) => (
                                        <li key={index}>{value}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" onChange={e => setInputData({ ...inputData, email: e.target.value })} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your password</label>
                        <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={e => setInputData({ ...inputData, password: e.target.value })} />
                    </div>
                    <div className="flex items-start mb-5"></div>
                    <button onClick={handleLogin} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Login
                    </button>
                </div>
            </div>
        </>
    );
}
