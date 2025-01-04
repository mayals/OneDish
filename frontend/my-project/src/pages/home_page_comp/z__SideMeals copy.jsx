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
        <section className="text-gray-700 body-font" id="gallery">
            <h2 className="flex justify-center text-3xl font-bold text-gray-800 text-center py-10">
                Side Meals
            </h2>
            {sideMeals.map((smObj) => (
                <SideMealCard key={smObj.id} smObj={smObj} />
            ))}
        </section>
    );
};

export default SideMeals;
