import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import CartScreen from "./screens/CartScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";

function App() {
  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/register" element={<RegisterScreen />} exact />
            <Route path="/login" element={<LoginScreen />} exact />
            <Route path="/profile" element={<ProfileScreen />} exact />
            <Route path="/shipping" element={<ShippingScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart/:id?" element={<CartScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
