import './App.css';
import Navbar from './Components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Components/Pages/ShopCategory';
import LoginSignup from './Components/Pages/LoginSignup';
import Product from './Components/Pages/Product'; 
import Cart from './Components/Pages/Cart'; 
// import Shop from './Components/Pages/Shop'; 
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
