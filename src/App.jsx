import React from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import About from "./components/About";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <Banner />
      <About />
      <Products />
      <Cart />
      <Footer />
    </>
  );
};

export default App;
