// SideMealCard.jsx
import React from "react";
import weightSvg from "../../assets/weight-scale-svgrepo-com.svg"
import kcalSvg from "../../assets/calories-svgrepo-com.svg"



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
                        
                        
                       

                    <div className="relative p-6">
                        <div className="flex items-center justify-center"></div>
                            <div className="relative w-full">
                                    <h3 className="font-bold text-2xl text-gray-800 mb-2">
                                        {smObj.name}
                                    </h3>
                                    {/* Green Circle */}
                                    <div className="absolute -top-[-24] left-1/2 transform -translate-x-1/2 bg-green-500 h-24 w-24 flex items-center justify-center rounded-full shadow-lg">
                                        <h2 className="font-bold text-3xl text-white">
                                            {smObj.price} Dhs
                                        </h2>
                                    </div>
                                    <p className="text-gray-600 mt-32 text-base mb-4">
                                        {smObj.descriptions}
                                    </p>
                            </div>
                        </div>    
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