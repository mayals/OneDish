// SideMealCard.jsx

import React from "react";

const SideMealCard = ({ smObj }) => {
    console.log("meal id in sideMeal =", smObj.id);

    return (
        <section>
            <div className="p-2">
                <div className="group relative">
                    <img
                        src={smObj.image}
                        alt={smObj.name}
                        className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
                    />
                </div>
            </div>
        </section>
    );
};

export default SideMealCard;
