import React, { Component } from "react";
import Modal from "./Modal";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { LoadingConsumer, CartContext } from "../helper/Context";
import { Link } from "react-router-dom";
import PriceSelectionModal from "./PriceSelectionModal";
import { Currency } from "../queries/queries";
import { categoriesQuery } from "../queries/queries";
import { Query } from "@apollo/client/react/components";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedCart: false,
    };
    this.navRef = React.createRef();
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

  render() {
    const { qty } = this.context;
    return (
      <LoadingConsumer>
        {({ load, select, clickedPrice, priceClick, outsidePriceClick }) => {
          return (
            <div
              ref={this.navRef}
              className="nav-container"
              onClick={(e) => {
                if (this.navRef.current === e.target) {
                  outsidePriceClick();
                }
              }}
            >
              <Query query={categoriesQuery}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return;
                  } else if (error) {
                    return;
                  } else {
                    const categories = data.categories;
                    return (
                      <ul className="nav-list">
                        {categories.map((cat) => {
                          return (
                            <li key={cat.name}>
                              <Link to="/">
                                <p onClick={(e) => load(e)}>
                                  {cat.name.toUpperCase()}
                                </p>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }
                }}
              </Query>

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

                <button className="price-button" onClick={() => priceClick()}>
                  {clickedPrice ? "^" : "v"}
                </button>
                {clickedPrice && <PriceSelectionModal />}
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
          );
        }}
      </LoadingConsumer>
    );
  }
}

Navbar.contextType = CartContext;

export default Navbar;
