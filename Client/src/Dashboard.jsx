
import  { useEffect, useState } from 'react';
import axios from 'axios';

import {useNavigate} from 'react-router-dom'
export const Dashboard = () => {

    const [user, setUser] = useState({ name: '', email: '' });
    const navigate=useNavigate()
    const [motivationalQuote, setMotivationalQuote] = useState({ quote: '', author: '' });
   
    useEffect(() => {
        // Function to fetch a motivational quote from your backend
        const fetchMotivationalQuote = async () => {
            try {
                const res = await axios.get('http://localhost:4000/motivational-quote');
                setMotivationalQuote(res.data);
                
            } catch (error) {
                console.error('Error fetching motivational quote:', error);
            }
        };

        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found in local storage');
                    return;
                }
                const res = await axios.get('http://localhost:4000/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(res.data);
                
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        

        fetchMotivationalQuote();
        fetchUserData();
       
    }, []);
    const handleLogout = async () => {
        try {
            const res = await axios.post('http://localhost:4000/logout', {}, { withCredentials: true });
            if (res.data.status === "success") {
                // Clear the token from localStorage
                localStorage.removeItem('token');
                alert("You have successfully logged out");
                navigate('/signin');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <>
        <div >
            <div className="bg-blue-100 p-1">
            <div className="flex justify-between items-center m-2 md:mx-32 ">
                <div className=" rounded-full bg-white">
                    <h1 className="p-1 m-2 poppins font-bold text-blue-900 text-2xl">InspireDaily</h1>
                </div>
                <div className="rounded-full ">
                
                <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-lg ml-4">Logout</button>
                </div>

            </div>
            </div>

            <div className="m-10 text-center">
                
                <marquee className="text-xl poppins-bold bg-teal-300">Daily Check your mail box to get Inspirational Quotes</marquee>
            <div className="font-bold poppins text-2xl p-5">
                <h1>Welcome, <span className="text-purple-500">{user.name}</span></h1>
                <p>Your email: <span className="text-purple-500">{user.email}</span></p>
            </div>
            <h2 className="p-2 text-bue-400 text-2xl m-2">Today&apos;s Motivational Quote:</h2>

            <div className="p-8 rounded-full md:m-5  m-3 bg-red-100 ">
                <p className="poppins-bold text-xl md:text-2xl text-red-500 ">{motivationalQuote.quote}</p>
                <p className=" text-2xl italic  p-1 text-blue-800">- {motivationalQuote.author}</p>
            </div>
            <div className="">
                
                <ul className="m-10 md:m-10 text-xl md:text-2xl text-green-800">
                    <li className='p-2 '>Stay positive and focused.</li>
                    
                    <li className='p-2 text-amber-600'>Make it a habit to read the motivational quote via Gmail every morning at 9:00 am and begin your day with these inspiring words.</li>
                    <li className='p-2'>Set your goals and work towards achieving them.</li>
                </ul>
            </div>
            </div>
            </div>



        </>
    )
}
