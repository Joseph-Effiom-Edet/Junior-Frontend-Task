import { Component } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Products />
      </>
    );
  }
}

export default Home;
