import React from 'react';

const Navbar = () => {

     return(
        <section className='fixed w-full mx-0 mt-16 md:mt-10 lg:mt-10 transition-all duration-500'>
            
            <nav className="bg-white mx-0 w-full dark:bg-gray-700 ">
                <div className="max-w-screen-xl px-4 py-3">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm mx-2">
                            <li>
                                <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 dark:text-white hover:underline">Our Service</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 dark:text-white hover:underline">Features</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 dark:text-white hover:underline">Our cheives</a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 dark:text-white hover:underline">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
)
}
export default Navbar