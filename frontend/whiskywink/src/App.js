import './App.css';
import ShopCategory from './Pages/ShopCategory';
import Navbar from './Components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product'; 
import Cart from './Pages/Cart'; 
import Footer from './Components/Footer/Footer';  


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<ShopCategory category="all" />} />
          <Route path='/bourbon' element={<ShopCategory category="bourbon" />} />
          <Route path='/scotch' element={<ShopCategory category="scotch" />} />
          <Route path='/japanese' element={<ShopCategory category="japanese" />} />
          <Route path='/irish' element={<ShopCategory category="irish" />} />
          <Route path="/product" element={<Product/>}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<LoginSignup/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    
    </div> 
    
  );
}

export default App;
