import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
    const [dataProfile, setDataProfile] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setDataProfile(res.data.data);
        })
        .catch(err => {
            console.log(err);
            navigate('/login');
        });
    }, []);

    const navigate = useNavigate();

    function handleLogout() {
        axios.get('http://localhost:8000/logout', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            localStorage.removeItem('access_token');
            navigate('/login');
        })
        .catch(err => {
            console.log(err);
        });
    }

    const openModal = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <Navbar />
            <div className="bg-white min-h-screen">
                <div className="py-15"></div>
                <div className="block m-auto mt-10 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pb-6 pt-6">
                        <img 
                            src="../public/user.jpg" 
                            className="w-32 h-32 rounded-full mb-4 cursor-pointer" 
                            alt="Profile Picture" 
                            onClick={openModal}
                        />
                        <h5 className="mb-1 text-2xl font-semibold text-gray-900 dark:text-white">{dataProfile.username}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{dataProfile.email}</span>
                        <div className="flex mt-6 space-x-4">
                            <Link to={'/dashboard'} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition ease-in-out duration-150">Dashboard</Link>
                            <button onClick={handleLogout} className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition ease-in-out duration-150">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
                    <div className="relative">
                        <button onClick={closeModal} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <img src="../public/user.jpg" style={{ width: '400px', height: '400px' }} alt="Profile Picture" />
                    </div>
                </div>
            )}
        </>
    );
}
