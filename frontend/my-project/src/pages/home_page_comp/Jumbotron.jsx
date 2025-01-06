import React from "react";
import { useState } from "react";


// https://img.freepik.com/free-photo/top-view-delicious-meat-soup-with-sliced-vegetables-grey-space_140725-75718.jpg" 





const Jumbotron = () => {
  

    return (
  
      <section  className="bg-[#8b9797] bg-blend-multiply w-full mb-0 h-screen bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/raw-tagliatelle-rigatoni-with-copy-space_23-2148360782.jpg')]">
          <div className="px-4 max-w-screen-xl text-center py-24 lg:py-56">
                {/* Title */}
                <h1 className="mb-6 text-5xl font-extrabold text-white md:text-6xl lg:text-7xl md:z-0">
                    <div className="z-0 bg-gradient-to-r from-yellow-400 via-red-300 to-yellow-400 bg-clip-text text-transparent px-2">
                        OneDish
                    </div>
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
                <span id="mainmeal"></span>
          </div>
      </section>
    );
  };
  
  export default Jumbotron;