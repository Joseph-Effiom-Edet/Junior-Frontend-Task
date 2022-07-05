/* eslint-disable array-callback-return */
import { Component } from "react";
import Navbar from "../components/Navbar";
import { CartConsumer, LoadingContext } from "../helper/Context";

class Cart extends Component {
  render() {
    const { select } = this.context;
    return (
      <>
        <Navbar />
        <CartConsumer>
          {({ cartItem, qty, selectedItem, removeItem  }) => {
            const itemsPrice = cartItem.reduce((a, b) => a + b.prices[select].amount * b.qty, 0);
            const taxPrice = itemsPrice * 0.21;
            const total = itemsPrice + taxPrice
            
            return (
              <>
                {cartItem.length === 0 ? <div>
                  <h1 className="cart">CART</h1>
                  <hr />
                  <div className="cart-empty">
                    Cart is empty
                  </div>
                  <hr/>
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
                </div> : <div>
                  <h1 className="cart">CART</h1>
                  <hr />
                  {cartItem.map((item) => {
                    return (
                      <div key={item.id}>
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
                              {item.attributes.map((att) => {
                                if (att.type === "swatch") {
                                  return (
                                    <div key={att.id}>
                                      {item.color ? <h3 className="cart-att-name">{att.name.toUpperCase()}:</h3> : null}
                                      {item.color ? <button className="cart-color-att" style={{backgroundColor: `${item.color}`}}></button> : null}
                                    </div>
                                  );
                                } else if (att.name === "Size") {
                                  return (
                                    <div key={att.id}>
                                      <h3 className="cart-att-name">{att.name.toUpperCase()}:</h3>
                                      <button className="cart-other-att">{item.other[0]}</button>
                                    </div>
                                  );
                                } else if (att.name === "Capacity") {
                                  return (
                                    <div key={att.id}>
                                      <h3 className="cart-att-name">{att.name.toUpperCase()}:</h3>
                                      <button className="cart-other-att">{item.other[0]}</button>
                                    </div>
                                  );
                                } else if (att.name === "With USB 3 ports") {
                                  return (
                                    <div key={att.id}>
                                      <h3 className="cart-att-name">{att.name.toUpperCase()}:</h3>
                                      <button className="cart-other-att">{item.other[1]}</button>
                                    </div>
                                  );
                                } else if (att.name === "Touch ID in keyboard") {
                                  return (
                                    <div key={att.id}>
                                      <h3 className="cart-att-name">{att.name.toUpperCase()}:</h3>
                                      <button className="cart-other-att">{item.other[2]}</button>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </div>
                          <div className="cart-item-selection-image">
                            <div className="cart-item-select">
                              <button onClick={() => selectedItem(item, null)}>+</button>
                              <span>{item.qty}</span>
                              <button onClick={() => removeItem(item)}>-</button>
                            </div>
                            <img src={item.gallery[0]} alt="" />
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                  <div className="shopping-bag-details">
                    <p className="tax">
                      Tax 21%: <span>${taxPrice.toFixed(2)}</span>
                    </p>
                    <p>
                      Quantity: <span>{qty}</span>
                    </p>
                    <p className="cart-total">
                      Total: <span>${total.toFixed(2)}</span>
                    </p>
                    <button className="order">ORDER</button>
                  </div>
                </div>}
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
