import React from 'react';

import  starPriceSvg from "../../assets/commercial-label-black-shape-svgrepo-com.svg"

const Circle = ({ price}) => {
    

    return (
        <section >
          
                <h2 className="absolute mx-[105px] mt-6 font-bold text-3xl text-black z-3 bg-white rounded-full h-20 w-20 border-2 border-[#b5926f] items-center align-center p-4">
                    {price}<span className='text-gray-500  text-sm'>dhs</span> 
                </h2>
                <img src={starPriceSvg} className='mx-20 h-32 w-32 z-0'/> 
          
        </section>
    );
};

export default Circle;
