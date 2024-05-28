
import { Navbar } from "./Navbar"; 

import img1 from "../images/img1.jpeg"
import img2 from "../images/img2.png"
import img3 from "../images/img3.jpeg"
import img4 from "../images/img4.jpeg"
import img5 from "../images/img5.jpeg"
import img6 from "../images/img6.jpeg"
import img7 from "../images/img-7.jpeg"
import img8 from "../images/img8.jpeg"
import img9 from "../images/img9.png"
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <>
    <div>
        <Navbar/>

        <div className='m-10 text-center '>
          <div className="md:flex  justify-center align-center  p-2 bg-zinc-100">
            <div className="justify-center flex p-2">
            <img src={img7} alt="" className="rounded-full w-28 h-28    md:w-40 md:h-40" />

            </div>
         <div className="md:p-2">

         <h1 className='poppins-bold text-xl md:text-3xl'>Embrace each day with boundless energy and unwavering optimism.</h1>
          <p className=" text-sm p-1 md:text-2xl md:p-2">Quotes expand our perspective, inspire reflection, and improve our mood.</p>
          

         </div>
          </div>
          <div className="m-4 ">

          <p className="poppins-bold text-teal-600  md:text-2xl md:p-2">If You wanted to recieve motivational quotes daily morning at 9:00 am </p>
          <p className="poppins-bold">Click the button below to register</p>
          <button className="bg-purple-500 p-2 text-white m-2 hover:bg-blue-600"><Link to={"/Signin"}>Click Me</Link></button>
          </div> 
          <div className="grid grid-cols-2 md:grid-cols-4" >
          <img src={img1} className="m-1 p-1 h-56 md:h-80  text-center block transform hover:scale-105 hover:shadow-2xl  transition delay-50 duration-300 ease-in-out w-64" />
          <img src={img2} className="m-1 p-1  h-56 md:h-80  text-center block transform hover:scale-105 hover:shadow-2xl  transition delay-50 duration-300 ease-in-out  w-64" />
          <img src={img3} className="m-1 p-1  h-56 md:h-80  text-center block transform hover:scale-105 hover:shadow-2xl  transition delay-50 duration-300 ease-in-out  w-64" />
          <img src={img4} className="m-1 p-1  h-56 md:h-80  text-center block transform hover:scale-105 hover:shadow-2xl  transition delay-50 duration-300 ease-in-out  w-64" />
          <img src={img5} className="m-1 p-1  h-56 md:h-80  text-center block transform hover:scale-105 hover:shadow-2xl  transition delay-50 duration-300 ease-in-out  w-64" />
          <img src={img6} className="m-1 p-1  h-56 md:h-80  text-center block transform hover:scale-105 hover:shadow-2xl  transition delay-50 duration-300 ease-in-out  w-64" />
          <img src={img8} className="m-1 p-1  h-56 md:h-80  text-center block transform hover:scale-105 hover:shadow-2xl  transition delay-50 duration-300 ease-in-out w-64" />
          <img src={img9} className="m-1 p-1  h-56 md:h-80  text-center block transform hover:scale-105 hover:shadow-2xl  transition delay-50 duration-300 ease-in-out  w-64" />
       
          </div>
        </div>

        <div>
         
        </div>
        <footer className="bg-blue-600 text-center text-2xl font-bold">
        <div className=" ">     
        <div className=" rounded-full">
        <h1 className="p-1 m-2 poppins font-bold text-white text-2xl">InspireDaily</h1>

          </div>   
        </div>  
        </footer>
    </div>
    
    </>
  )
}
