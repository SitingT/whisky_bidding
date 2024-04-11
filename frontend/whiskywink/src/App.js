import "./App.css";
import ShopCategory from "./Pages/ShopCategory";
import Navbar from "./Components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./Pages/LoginSignup";
import Product from "./Pages/Product";
import SellItem from "./Pages/SellItem";
import MyBid from "./Pages/MyBid";
import Footer from "./Components/Footer/Footer";
import WhiskyReport from "./Pages/report";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShopCategory category="All" />} />
          <Route
            path="/bourbon"
            element={<ShopCategory category="Bourbon" />}
          />
          <Route path="/scotch" element={<ShopCategory category="Scotch" />} />
          <Route
            path="/japanese"
            element={<ShopCategory category="Japanese" />}
          />
          <Route path="/irish" element={<ShopCategory category="Irish" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/Sell" element={<SellItem />} />
          <Route path="/MyBid" element={<MyBid />} />
          <Route path="/Report" element={<WhiskyReport />} />
          <Route path="/CheckOut" element={<WhiskyReport />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
