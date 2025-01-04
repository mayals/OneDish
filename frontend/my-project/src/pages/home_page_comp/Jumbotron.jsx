import React from "react";
import { useState } from "react";


// https://img.freepik.com/free-photo/top-view-delicious-meat-soup-with-sliced-vegetables-grey-space_140725-75718.jpg" 





const Jumbotron = () => {
  
  

    return (
      <section className=" bg-yellow-500 bg-blend-multiply w-full mb-0 h-screen bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/top-view-delicious-meat-soup-with-sliced-vegetables-grey-space_140725-75718.jpg')]">
          <div className="px-4 max-w-screen-xl text-center py-24 lg:py-56">
                <h1 className="mb-4 text-4xl font-extrabold font-bodyFont tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                    <span className="drop-shadow-2xl font-extrabold font-bodyFont px-1 text-black w-fit text-5xl mx-2 rounded-lg text-yellow-900 hover:text-yellow-400 bg-[#202328] hover:bg-gray-900 transform transition duration-1000 hover:scale-110">
                        OneDish
                    </span>
                    {/* <mark className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">
                        OneDish
                    </mark> */}
                    
                      مرحبا بكم في مطعم
                </h1>
                <br></br>

                <p className="mb-8 text-2xl font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                وجبتنا اليوم مميزة ومختارة بعناية!
                استمتعوا بوجبة واحدة لا تُنسى كل يوم، تجربة فريدة تنتظركم
                </p>
                <p className="mb-8 text-2xl font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
                Today's dish is special and carefully selected!
                Enjoy one unforgettable meal every day—a unique experience awaits you.
                </p>
          </div>
      </section>
    );
  };
  
  export default Jumbotron;
  