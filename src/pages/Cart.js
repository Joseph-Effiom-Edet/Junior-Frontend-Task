/* eslint-disable array-callback-return */
import { Component } from "react";
import Navbar from "../components/Navbar";
import { CartConsumer, LoadingContext } from "../helper/Context";
import { Query } from "@apollo/client/react/components";
import { Currency } from "../queries/queries";

class Cart extends Component {
  render() {
    const { select, outsidePriceClick } = this.context;
    return (
      <>
        <Navbar />
        <CartConsumer>
          {({ cartItem, qty, selectedItem, removeItem }) => {
            const itemsPrice = cartItem.reduce(
              (a, b) => a + b.prices[select].amount * b.qty,
              0
            );
            const taxPrice = itemsPrice * 0.21;
            const total = itemsPrice + taxPrice;

            return (
              <>
                {cartItem.length === 0 ? (
                  <div onClick={() => outsidePriceClick()}>
                    <h1 className="cart">CART</h1>
                    <hr />
                    <div className="cart-empty">Cart is empty</div>
                    <hr />
                    <div className="shopping-bag-details">
                      <p className="tax">
                        Tax 21%: <span>$0.00</span>
                      </p>
                      <p>
                        Quantity: <span>{qty}</span>
                      </p>
                      <p className="cart-total">
                        Total: <span>$0.00</span>
                      </p>
                      <button className="order">ORDER</button>
                    </div>
                  </div>
                ) : (
                  <div onClick={() => outsidePriceClick()}>
                    <h1 className="cart">CART</h1>
                    <hr />
                    {cartItem.map((item) => {
                      return (
                        <div key={item.cartId}>
                          <div className="cart-container">
                            <div>
                              <h1>{item.name}</h1>
                              <h2>{item.brand}</h2>
                              <div className="cart-price">
                                <p>
                                  <span>
                                    {item.prices[select].currency.symbol}
                                  </span>
                                  {item.prices[select].amount}
                                </p>
                              </div>
                              <div>
                                {item.attributes.map((att, index) => {
                                  if (att.type === "swatch") {
                                    return (
                                      <div key={att.id}>
                                        <h4 className="cart-att-name">{att.name}</h4>
                                        <div>{att.items.map(attItem => {
                                          const value = attItem.value
                                          return (
                                            <button
                                            className="cart-color-att"
                                            key={attItem.id}
                                            style={
                                            value ===
                                            item.color
                                              ? {
                                                  backgroundColor: `${attItem.value}`,
                                                  border: "1px solid #5ECE7B",
                                                }
                                              : {
                                                  backgroundColor: `${attItem.value}`,
                                                }
                                          }></button>
                                          )
                                        })}</div>
                                      </div>
                                    )
                                  }else {
                                    return (
                                      <div key={att.id}>
                                        <h4 className="cart-att-name">{att.name}</h4>
                                        <div>{att.items.map(attItem => {
                                          const value = attItem.value
                                          return (
                                            <button key={attItem.id} className="cart-other-att" style={
                                            value ===
                                            item.others0
                                              ? {
                                                  backgroundColor: "black",
                                                  color: "white",
                                                }
                                              : value ===
                                                item.others1 && index === 1
                                              ? {
                                                  backgroundColor: "black",
                                                  color: "white",
                                                }
                                              : value ===
                                                item.others2 && index === 2
                                              ? {
                                                  backgroundColor: "black",
                                                  color: "white",
                                                }
                                              : null
                                          }>{attItem.value}</button>
                                          )
                                        })}</div>
                                      </div>
                                    )
                                   }
                                })}
                              </div>
                            </div>
                            <div className="cart-item-selection-image">
                              <div className="cart-item-select">
                                <button
                                  onClick={() => selectedItem(item, item)}
                                >
                                  +
                                </button>
                                <span className="qty">{item.qty}</span>
                                <button onClick={() => removeItem(item)}>
                                  -
                                </button>
                              </div>
                              <img src={item.gallery[0]} alt="" />
                            </div>
                          </div>
                          <hr />
                        </div>
                      );
                    })}
                    <Query query={Currency}>
                      {({ loading, error, data }) => {
                        if (loading) {
                          return;
                        } else if (error) {
                          return;
                        } else {
                          const currencySymbol = data.currencies;
                          return (
                            <div className="shopping-bag-details">
                              <p className="tax">
                                Tax 21%: <span>{currencySymbol[select].symbol}{taxPrice.toFixed(2)}</span>
                              </p>
                              <p>
                                Quantity: <span>{qty}</span>
                              </p>
                              <p className="cart-total">
                                Total: <span>{currencySymbol[select].symbol}{total.toFixed(2)}</span>
                              </p>
                              <button className="order">ORDER</button>
                            </div>
                          );
                        }
                      }}
                    </Query>
                  </div>
                )}
              </>
            );
          }}
        </CartConsumer>
      </>
    );
  }
}

Cart.contextType = LoadingContext;

export default Cart;
