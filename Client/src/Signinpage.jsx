import { FcGoogle } from "react-icons/fc";
import { BsLinkedin } from "react-icons/bs";
import { Navbar } from "./Navbar";
import './App.css'

import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useState} from "react";

export const Signinpage = () => {
    const navigate=useNavigate()
    const [Newlogin, setlogin] = useState(false);
    const [name, setname] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");

    const [Signpassword, setSignpassword] = useState("");
    const [Signemail, setSignemail] = useState("");

    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!name.trim() || !email.trim() || !password.trim()) {
        alert("Please fill in all fields.");
        return;
    }
      console.log({ name, email, password });
      try {

          const res = await axios.post('http://localhost:4000/register', { name, email, password });
          if (res.data.status === "ok"){
            alert("Your Account has been Successfully Created !!");
            navigate('/dashboard')
          }
          else{
            alert("Your have Already Registered  You Can Login");
          }
          
          
      } catch (err) {
          console.log(err);
      }
  };

  const handleSignSubmit = async (e) => {
    e.preventDefault();
    if ( !email.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
  }
    try {
        const res=await axios.post('http://localhost:4000/login', { email: Signemail, password: Signpassword }, { withCredentials: true });
        
        if (res.data.status === "success") {
          alert("You have Successfully Logged in!!");
          console.log(res.data.token)
          localStorage.setItem('token', res.data.token);
          navigate('/dashboard')
      }
      else{
        alert("You have login incorrect password or Email !!");
      }
        
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert("No record exists or incorrect password!");
    } else {
        console.log(err);
        alert("An error occurred during login. Please try again.");
    }
    }
};



  return (
    <>
      <Navbar setlogin={setlogin} Newlogin={Newlogin}  />
      <div className=' grid grid-cols-2 m-28'>
        <div className='p-4   text-4xl poppins-extrabold'>
          <h1 className='p-2'> {Newlogin ? "Sign in" : "Sign up"} for daily </h1>
          <h1 className='p-2'><span className='text-purple-600 pad'>Inspirational quotes</span> and  </h1>
          <h1 className='p-2'> spark your Gmail!</h1>
          <div>
            {Newlogin ? <p className=' text-sm poppins  m-6'>If you don&apos; t have account <br /> you can <span className='text-blue-800'>register here</span> </p>
              : <p className=' text-sm poppins  m-6'>If you already have account <br /> you can <span className='text-blue-800'>login here</span> </p>
            }
          </div>
        </div>

        <div className='flex justify-center m-10 '>
          <div>
            {Newlogin ? <>
            <form onSubmit={handleSignSubmit}>
            <div className='p-2'>
              <input type="text" className='w-80 bg-slate-100 rounded-lg p-1 ' placeholder='Enter Email' onChange={(e)=>setSignemail(e.target.value)}/>
            </div>
            <div className='p-2'>
              <input type="text" className='w-80 bg-slate-100 rounded-lg p-1 ' placeholder='Enter Password' onChange={(e)=>setSignpassword(e.target.value)} />
            </div>
            <div className='p-2'><p className="poppins text-end">forgot Password ?</p></div>

            <div className='p-2'>
              <button className='bg-purple-600 text-white p-2  rounded-lg w-80'>Sign In</button>
            </div>
            
            </form>
           

            </>: <>
            <form onSubmit={handleSubmit}>
            
            <div className='p-2'>
              <input type="text" className='w-80 bg-slate-100  rounded-lg p-1 ' placeholder='Enter Name' onChange={(e)=>setname(e.target.value)} />
            </div>
            <div className='p-2'>
              <input type="text" className='w-80 bg-slate-100 rounded-lg p-1 ' placeholder='Enter Email' onChange={(e)=>setemail(e.target.value)} />
            </div>
            <div className='p-2'>
              <input type="text" className='w-80 bg-slate-100 rounded-lg p-1 ' placeholder='Enter Password' onChange={(e)=>setpassword(e.target.value)} />
            </div>

            <div className='p-2'>
              <button type="submit" className='bg-purple-600 text-white p-2  rounded-lg w-80'>Sign Up</button>
            </div>
            
            </form>
           
            </>}
          </div>
        </div>


      </div>


    </>
  )
}
