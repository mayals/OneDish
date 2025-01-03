import { useContext } from 'react'
import SideMealCard from './SideMealCard'
import { SideMealsContext } from './SideMealsContext';

const SideMeals = () =>{

    
   const meals = useContext(SideMealsContext);
   console.log('meals in side meals=',meals)  
    
    return(
        <section className="text-gray-700 body-font" id="gallery">
            
            <h2 className="flex justify-center text-3xl font-bold text-gray-800 text-center py-10">
                Side Meals
            </h2>

            <SideMealCard
                       
            />
        </section>
    )
}

export default SideMeals;