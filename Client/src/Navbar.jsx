import { Link } from "react-router-dom";
export const Navbar = ({ setlogin, Newlogin }) => {




    const handleSignInClick = () => {
        setlogin(true);
    };

    const handleRegisterClick = () => {
        setlogin(false);
    };


    return (
     <div className="bg-blue-100 p-1">
        <div className="flex justify-between items-center m-2 md:mx-20">
        <div className=" rounded-full bg-white">        
            <h1 className="p-1 m-2 poppins font-bold text-blue-900 text-2xl">InspireDaily</h1>
        </div>        
        <div className="justify-end flex  align-center">
        <button className="p-1 m-2 text-purple-600 rounded-lg poppins-bold hover:underline hover:underline-offset-8 hover:decoration-purple-600 hover:decoration-2"
                onClick={handleSignInClick}
            >
                <Link to={"/Signin"}>Sign in</Link>
            </button>
            <button className="p-1 m-2 rounded-lg text-purple-600 poppins-bold hover:underline hover:underline-offset-8 hover:decoration-purple-600 hover:decoration-2" onClick={handleRegisterClick} ><Link to={"/Signin"}>Register</Link></button>
        </div>
        </div>
        </div>
    )
}
