import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home_page_comp/HomePage"
import { MainMealProvider } from  './pages/home_page_comp/MainMealProvider'
import { SideMealsProvider } from  './pages/home_page_comp/SideMealsProvider'

const App = () =>{

        return (
        
            <BrowserRouter basename='/OneDish/'>
                <MainMealProvider>
                <SideMealsProvider>
                    <Routes>

                        <Route path="/"  element={<HomePage />} />
                
                    </Routes>
                </SideMealsProvider>    
                </MainMealProvider>
            </BrowserRouter> 
    
        )
}

export default App;
