
// const mainMeal = {
//     id: 1,
//     name: "Classic Margherita Pizza",
//     descriptions: 
//         "سباغيتي اليوم هو طبق استثنائي يجمع بين المذاق الأصيل والنكهات الفريدة. يُحضّر من أجود أنواع المعكرونة مع صلصة الطماطم الطازجة والأعشاب الإيطالية العطرية. يُزين بطبقة سخية من جبنة البارميزان المبشورة لإضافة لمسة غنية ولذيذة. وجبة مثالية تجعلك تستمتع بكل قضمة وكأنك في قلب إيطاليا!",
//     price: 15,
//     discount: 5,
//     size: "small",
//     cuisine: "Italian",
//     caloriesPerServing: 300,
//     image: "https://cdn.dummyjson.com/recipe-images/1.webp",
//     rating: 4.6,
//     reviewCount: 3,
//     tags: ["spaghetti", "Italian"],
// };



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
