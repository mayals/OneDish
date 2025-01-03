import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home_page_comp/HomePage"
import { MainMealProvider } from  './pages/home_page_comp/MainMealProvider'


const App = () =>{

        return (
        
            <BrowserRouter>
                <MainMealProvider>
                    <Routes>

                        <Route path="/"  element={<HomePage />} />
                
                    </Routes>
                </MainMealProvider>
            </BrowserRouter> 
    
        )
}

export default App;
