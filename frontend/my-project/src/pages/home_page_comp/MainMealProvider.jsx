import React, { useState } from "react";
import { MainMealContext } from "./MainMealContext";
import { mainMealData } from "./mainMealData";





export const MainMealProvider = ({ children }) => {

    const [meal, setMeal] = useState(mainMealData);

    return (
        <MainMealContext.Provider value={{ meal, setMeal }}>
            {children}
        </MainMealContext.Provider>
    );
};
