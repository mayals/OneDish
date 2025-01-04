import React, { useEffect } from 'react';
import { useState } from 'react';
import logo from "../../assets/oneDishLogo.jpg"


const Navbar = () => {


    // navbar buttons:
    // MobileMenu button only in mobile size
    const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
    
    useEffect(()=>{
        setIsMobileMenuVisible(false)
    },[])

    const toggleMobileMenu = () => {
        setIsMobileMenuVisible((prev) => !prev);
    };




    return(
        <section className='mt-5 md:mt-10 transition-all duration-500'>
            {/* nav container for all sizes  */}
            <nav className="pt-3 pb-3 bg-white md:fixed md:w-full md:mx-0">

                {/* mobile  size  navbar container */}
                <div className="flex flex-wrap justify-between items-center"> 
                   {/*Mobile screen  Logo and Restaurant Name */}
                    <div className="flex md:hidden items-center space-x-2">        
                        <img
                            src={logo} 
                            alt="OneDish Logo"
                            className="w-10 h-10"
                        />
                        <span className="text-xl  font-bold text-tomato-600">OneDish daily</span>               
                    </div>
                    {/* Mobile button */}
                    <div className="flex md:hidden">
                        <button  onClick={toggleMobileMenu}>
                            <img className="toggle block" src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png" width="48" height="48" />
                            {/* <img className="toggle hidden" src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png" width="48" height="48" /> */}
                        </button>
                    </div>
                </div> 
                {/* Mobile screen menue links  view after click button */}
                {isMobileMenuVisible && (
                    <div className='md:hidden bg-mybody h-fit w-full mt-2 items-center py-3 shadow-lg border-t-2 border-[#7425ff]'>
                        <ul className="md:hidden flex flex-col gap-3">

                            <li className='text-lg  pt-4 pb-4 text-center'>
                            Home
                            </li>
                            <li className='text-lg  pt-4 pb-4 text-center'>
                            Products
                            </li>
                            <li className='text-lg  pt-4 pb-4 text-center'>
                            Pricing
                            </li>
                            <li className='text-lg  pt-4 pb-4 text-center'>
                            Contact
                            </li>
                        </ul>
                    </div>    
                )}




                {/* full screen size navbar container  */}
                <div className="hidden md:flex justify-center">
                    <div className=''>
                        <ul className="hidden md:flex md:items-center md:justify-center md:space-x-5 md:w-full md:w-auto md:flex md:text-right md:text-bold md:mt-0 md:align-center">
                            <li className='text-lg  pt-4 pb-4 text-center'>
                                Home
                            </li>
                            <li className='text-lg  pt-4 pb-4 text-center'>
                                Products
                            </li>
                            <li className='text-lg  pt-4 pb-4 text-center'>
                                Pricing
                            </li>
                            <li className='text-lg  pt-4 pb-4 text-center'>
                                Contact
                            </li>
                        </ul>
                    </div>
                    <div className='text-lg  pt-4 pb-4 text-center hover:bg-teal-500 text-white'>
                        Create Account
                    </div>
                </div>
            </nav>

        </section>
    ) 
}
export default Navbar