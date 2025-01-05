// SideMealCard.jsx
import React from "react";
import weightSvg from "../../assets/weight-scale-svgrepo-com.svg"
import kcalSvg from "../../assets/calories-svgrepo-com.svg"
import Circle from "./Circle"


const SideMealCard = ({ smObj }) => {
    console.log("meal id in sideMeal =", smObj.id);

    return (
        
        <section className="flex justify-center items-center py-8 md:z-0 z-0">
                <div className="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden group relative">
                        
                        {/* ID Label */}
                        {/* <div className="absolute top-4 left-4 bg-gray-700 text-white text-xl font-bold rounded-full h-10 w-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-3xl text-white">
                                #{smObj.id}
                            </span>   
                        </div> */}
                        <div className="absolute mt-2 mx-2 group-hover:scale-105 bg-gray-700 md:z-10 z-10 rounded-full h-fit w-fit p-1">
                            <span className="text-3xl text-white">
                                #{smObj.id}
                            </span>   
                        </div>
                        
                        {/* Image */}
                        <img
                            src={smObj.image}
                            alt={smObj.name}
                            className="w-full aspect-[2/3] object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105 md:z-0 z-0"
                        />
                        
                        
                       
                   {/* Content */}
                    <div className="relative p-6">
                        <div className="flex items-center justify-center"></div>
                            <div className="relative w-full">
                                    <h3 className="font-bold text-2xl text-gray-800 mb-2">
                                        {smObj.name}
                                    </h3>

                                    {/* price label Circle */}
                                    <div className="h-24 w-24">
                                        <Circle price={smObj.price} />
                                    </div>

                                    <p className="text-gray-600 mt-12 text-base mb-4 font-semibold">
                                        {smObj.descriptions}
                                    </p>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="p-6 ">        
                                <div className="flex justify-around items-center space-x-2 text-xs">
                                    <div className="bg-gray-200  p-1 text-sm text-gray-700">
                                        <span className="flex text-xs items-center">
                                            <img src={weightSvg} className="h-6 w-6 mr-1 items-center"/>
                                            <span className="font-semibold">{smObj.size}</span>
                                        </span>
                                    </div>
                                    <div className="bg-gray-200  p-1 text-sm text-gray-700">
                                        <span className="flex text-xs items-center">
                                            <img src={kcalSvg}  className="h-6 w-6 mr-1 "/>
                                            <span className="font-semibold">{smObj.caloriesPerServing}</span>
                                        </span>
                                    </div>
                                </div>

                                <br></br>

                                <div className="items-center bg-white text-xs">    
                                    <span className="flex text-s items-center">
                                        <img src="https://img.freepik.com/free-psd/star-winner-rating-review-icon-sign-symbol-3d-background-illustration_56104-2417.jpg"  className="h-8 w-8 mr-1 items-center"/>
                                        <span className="font-semibold">{smObj.rating}</span>({smObj.reviewCount})
                                    </span>
                                </div>
                        </div>
                     
                </div>
        </section>

    )
}
export default SideMealCard;