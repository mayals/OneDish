// SideMeals.jsx

import { useContext } from "react";
import SideMealCard from "./SideMealCard";
import { SideMealsContext } from "./SideMealsContext";

const SideMeals = () => {
    const [sideMeals] = useContext(SideMealsContext);

    if (!Array.isArray(sideMeals)) {
        console.error("Side meals data is not valid.");
        return <div>Error: Side meals data is not valid.</div>;
    }

    return (
        <section className="text-gray-700" id="gallery">
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-900 to-orange-100 mb-0 text-center pt-12">الوجبات الجانبية</h2>

                <div className="md:flex py-16 md:justify-around md:align-center items-center text-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        
                        {sideMeals.map((smObj) => (

                            <SideMealCard 
                                        key={smObj.id} 
                                        smObj={smObj}    
                            />

                        ))}
                        
                </div>
        </section>
    );
};

export default SideMeals;
