import React from 'react'
import { useState } from "react";



const SideMealCard =()=>{

    const [meal,setMeal] = useState('');

    return(
            <section>
                <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    <div className="group relative">
                        <img
                            src="https://img.freepik.com/free-photo/fresh-cola-drink-glass_144627-16208.jpg"
                            alt="Image 1"
                            className="aspect-[2/3] h-80 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
                        />
                    </div>
                </div>
            </section>
    )
}
export default  SideMealCard;