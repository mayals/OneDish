// MainMeal.jsx 

import { useContext } from "react";
import { MainMealContext } from "./MainMealContext";
import weightSvg from "../../assets/weight-scale-svgrepo-com.svg"
import kcalSvg from "../../assets/calories-svgrepo-com.svg"
import Circle from "./Circle"



const MainMeal = () => {
    const { meal, setMeal } = useContext(MainMealContext);
    console.log("from context MainMealContext =", meal);
    
    
    //  for update state value
    const updateMeal = () => {

            setMeal((prevMeal) => ({
                ...prevMeal,
                price: prevMeal.price + 5, // Example: Incrementing price
            }));
    };

   


  return(
        <section  className="bg-gray-100 mt-0">
       
           <h2  className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-900 to-orange-100 mb-0 text-center pt-12">الوجبة الرئيسية</h2>
                
                <div className="container py-16 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 flex md:justify-around items-center gap-8">
                        
                        <div className="">
                            <div className="relative flex justify-center items-center">
                                <img src="https://img.freepik.com/free-photo/pasta-with-cheese-cherry-tomatoes_661915-51.jpg" alt="Main Meal Image" className="object-cover rounded-lg shadow-md"/>
                            </div>

                            <div className="absolute mt-[-580px] ml-[5px] md:mt-[-600px] md:mx-[95px]  bg-gray-700 md:z-10 z-10 rounded-full h-fit w-fit p-1">
                                <span className="text-3xl text-white">
                                    #{meal.id}
                                </span>   
                            </div>
                        </div>

                        
                        
                        
                        <div className="justify-center items-center max-w-lg ltr:ml-3 rtl:mr-3">
                            <h3 className="font-bold text-4xl text-[#5e6700] mb-2 text-center">
                                {meal.name}
                            </h3>
                            <p className="my-2 text-2xl text-gray-600 leading-loose whitespace-normal text-center align-center">
                                <span className="sm:text-5xl text-xl text-gray-300 dark:text-gray-800">❞</span>
                                <br></br>                                               
                                   {meal.descriptions}
                                <br></br>
                                <span className="sm:text-5xl text-xl text-gray-300 dark:text-gray-800">❞</span>
                            </p>


                            {/* price label Circle */}
                            <div className="h-32 w-32 mx-[22px]">
                                <Circle price={meal.price} />
                            </div>


                            {/* Additional Info */}
                            <div className="p-6 ">        
                                    <div className="flex justify-around items-center space-x-2 text-xs">
                                        <div className="bg-gray-200  p-1 text-sm text-gray-700">
                                            <span className="flex text-xs items-center">
                                                <img src={weightSvg} className="h-6 w-6 mr-1 items-center"/>
                                                <span className="font-semibold">{meal.size}</span>
                                            </span>
                                        </div>
                                        <div className="bg-gray-200  p-1 text-sm text-gray-700">
                                            <span className="flex text-xs items-center">
                                                <img src={kcalSvg}  className="h-6 w-6 mr-1 "/>
                                                <span className="font-semibold">{meal.caloriesPerServing}</span>
                                            </span>
                                        </div>
                                    </div>
    
                                    <br></br>
    
                                    <div className="items-center  text-xs w-fit">    
                                        <span className="flex text-s items-center">
                                            <img src="https://img.freepik.com/free-psd/star-winner-rating-review-icon-sign-symbol-3d-background-illustration_56104-2417.jpg"  className="h-8 w-8 mr-1 items-center"/>
                                            <span className="font-semibold">{meal.rating}</span>({meal.reviewCount})
                                        </span>
                                    </div>
                            </div>
                        
                        </div>
                        <span id="sidemeal"></span>
                    </div>
                </div>
                 
        </section>
  )
}

export default MainMeal;