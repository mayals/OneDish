import React from 'react';
import Header from './Header.jsx';
import Navbar from "./Navbar.jsx"
import Jumbotron from './Jumbotron.jsx';
import MainMeal from './MainMeal.jsx';
import SideMeals from './SideMeals.jsx';
import OurLocation from './OurLocation.jsx';
import ContactUs from "./ContactUs.jsx"
import Footer from "./Footer.jsx"



const HomePage = () => {
    return (
            <section className='font-bodyFont'>
                    
                    <div id='header'>    
                        <Header/>
                    </div>
                    <div id='navbar'> 
                        <Navbar/>
                    </div>
                    <div id='jumbotron'> 
                        <Jumbotron/>
                    </div>
                    {/* <div id='mainmeal'>  */}
                        <MainMeal />
                    {/* </div> */}
                    {/* <div id='sidemeal'>  */}
                        <SideMeals/>
                    {/* </div> */}
                    {/* <div id='ourlocation'>  */}
                        <OurLocation/>
                    {/* </div> */}
                    {/* <div id='contactus'>  */}
                        <ContactUs />
                    {/* </div> */}
                    <div id='footer'> 
                        <Footer/>
                    </div>
                    
            </section>
    );
}

export default HomePage;