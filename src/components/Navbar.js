import { Component } from "react";
import Modal from "./Modal";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { LoadingConsumer, CartContext } from "../helper/Context";
import { Link } from "react-router-dom";
import PriceSelectionModal from "./PriceSelectionModal";
import { Currency } from "../queries/queries";
import { Query } from "@apollo/client/react/components";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedCart: false,
      clickedPrice: false,
    };
  }

  ClickedCart() {
    this.setState({
      clickedCart: true,
    });
  }

  ClickedModal() {
    this.setState({
      clickedCart: false,
    });
  }

  PriceClick() {
    if (this.state.clickedPrice === false) {
      this.setState({
        clickedCart: this.state.clickedCart,
        clickedPrice: true,
      });
    } else {
      this.setState({
        clickedCart: this.state.clickedCart,
        clickedPrice: false,
      });
    }
  }

  render() {
    const { qty } = this.context;
    return (
      <LoadingConsumer>
        {({load, select}) => {
          return (
            <div className="nav-container">
          <ul className="nav-list">
            <li onClick={(e) => load(e)}>
              <Link to={"/"}>
                <p>ALL</p>
              </Link>
            </li>
            <li onClick={(e) => load(e)}>
              <Link to={"/"}>
                <p>CLOTHES</p>
              </Link>
            </li>
            <li onClick={(e) => load(e)}>
              <Link to={"/"}>
                <p>TECH</p>
              </Link>
            </li>
          </ul>

          <RiShoppingBag2Fill className="store-icon" />

          <div className="nav-item">
            <Query query={Currency}>
              {({ loading, error, data }) => {
                if (loading) {
                  return;
                } else if (error) {
                  return;
                } else {
                  const currencySymbol = data.currencies;
                  return (
                    <p className="currency-symbol">
                      {currencySymbol[select].symbol}
                    </p>
                  );
                }
              }}
            </Query>

            <button className="price-button" onClick={() => this.PriceClick()}>
              {this.state.clickedPrice ? "^" : "v"}
            </button>
            {this.state.clickedPrice && (
              <PriceSelectionModal priceClick={this.PriceClick.bind(this)} />
            )}
            <FiShoppingCart
              className="nav-cart"
              onClick={() => this.ClickedCart()}
            />
            <span>{qty}</span>
          </div>
          {this.state.clickedCart && (
            <Modal clickedModal={this.ClickedModal.bind(this)} />
          )}
        </div>
          )
        }}
      </LoadingConsumer>
    );
  }
}

Navbar.contextType = CartContext;

export default Navbar;
