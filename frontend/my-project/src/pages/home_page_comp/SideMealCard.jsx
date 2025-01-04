// SideMealCard.jsx

import React from "react";

const SideMealCard = ({ smObj }) => {
    console.log("meal id in sideMeal =", smObj.id);

    return (
        // <section>
        //     <div className="p-2">
        //         <div className="group relative">
        //             <img
        //                 src={smObj.image}
        //                 alt={smObj.name}
        //                 className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
        //             />
        //         </div>
        //     </div>
        // </section>
        <section className="flex justify-center items-center py-8 md:z-0 z-0">
            <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden group">
                <img
                src={smObj.image}
                alt={smObj.name}
                className="w-full aspect-[2/3] object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105 md:z-0 z-0"
                />
                <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800 mb-2">
                    The Coldest Sunset
                </h3>
                <p className="text-gray-600 text-base mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
                    quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
                    nihil.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    #photography
                    </span>
                    <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    #travel
                    </span>
                    <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    #winter
                    </span>
                </div>
                </div>
            </div>
        </section>

    )
}
export default SideMealCard;