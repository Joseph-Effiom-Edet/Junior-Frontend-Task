import { Component } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Description from "./pages/Description";
import Cart from "./pages/Cart";
import { LoadingProvider, CartProvider } from "./helper/Context";

class App extends Component {
  render() {
    return (
      <LoadingProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="item/:id" element={<Description />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
        </CartProvider>
      </LoadingProvider>
    );
  }
}

export default App;
