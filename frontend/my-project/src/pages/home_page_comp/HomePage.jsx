import React from 'react';
import Header from './Header.jsx';
import Navbar from "./Navbar.jsx"
import Jumbotron from './Jumbotron.jsx';
import MainMeal from './MainMeal.jsx';
import SideMeals from './SideMeals.jsx';


// import Row2 from './Row2.jsx';
// import Row3 from './Row3.jsx';
// import Services from './Services.jsx';
// import Layer from './Layer.jsx';
// import Carousel from './Carousel.jsx';
// import Layer2 from './Layer2.jsx';
// import Contactus from './Contactus.jsx';
// import Footer from './Footer.jsx';


const HomePage = () => {
    return (
        <section className='font-bodyFont'>
                <Header/>
                <Navbar/>
                <Jumbotron/>
                <MainMeal />
                <SideMeals/>
                    {/* <Navbar/>
                        <div id='home'>    
                            <Row1 />
                        </div>   
                        <div id='aboutus'>    
                            <Aboutus />
                        </div>   
                            <Row2 />
                            <Row3 />
                        <div id='services'>   
                            <Services />
                        </div>
                            <Layer />
                            <Carousel />
                            <Layer2 />
                        <div id='contactus'>    
                            <Contactus />
                        </div>
                        <div id='socialMedia'>    
                            <socialMedia />
                        </div>

                <Footer /> */}
        </section>
    );
}

export default HomePage;