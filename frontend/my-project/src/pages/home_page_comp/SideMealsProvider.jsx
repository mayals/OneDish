// SideMealsProvider.jsx

import React, { useState } from "react";
import { SideMealsContext } from "./SideMealsContext";
import { sideMealsData } from "./sideMealsData";

export const SideMealsProvider = ({ children }) => {
    const [sideMeals, setSideMeals] = useState(sideMealsData);

    return (
        <SideMealsContext.Provider value={[sideMeals, setSideMeals]}>
            {children}
        </SideMealsContext.Provider>
    );
};





