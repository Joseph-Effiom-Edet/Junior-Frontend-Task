/* eslint-disable array-callback-return */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CartConsumer, LoadingContext } from "../helper/Context";
import { Link } from "react-router-dom";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.modalRef = React.createRef();
  }

  RemoveModal(e) {
    if (this.modalRef.current === e.target) {
      this.props.clickedModal();
    }
  }

  render() {
    const { select } = this.context;
    return ReactDOM.createPortal(
      <CartConsumer>
        {({ cartItem, qty, selectedItem, removeItem }) => {
          const itemsPrice = cartItem.reduce((a, b) => a + b.prices[select].amount * b.qty, 0);
          const taxPrice = itemsPrice * 0.21;
          const total = itemsPrice + taxPrice;
          return (
            <>
              {cartItem.length === 0 ? (
                <div
                  className="modal-background"
                  ref={this.modalRef}
                  onClick={(e) => this.RemoveModal(e)}
                >
                  <div className="modal-container">
                    <h5>
                      My Bag, <span>{qty} items</span>
                    </h5>
                    <div className="modal-empty">Cart is empty</div>
                    <p className="total">
                      Total: <span>$0.00</span>
                    </p>
                    <Link to={"/cart"}>
                      <button className="view-bag">VIEW BAG</button>
                    </Link>
                    <button className="check-out">CHECK OUT</button>
                  </div>
                </div>
              ) : (
                <div
                  className="modal-background"
                  ref={this.modalRef}
                  onClick={(e) => this.RemoveModal(e)}
                >
                  <div className="modal-container">
                    <h5>
                      My Bag, <span>{qty} items</span>
                    </h5>
                    {cartItem.map((item) => {
                      return (
                        <div key={item.name}>
                          <div className="modal-item-details">
                            <div>
                              <h1>{item.name}</h1>
                              <h1>{item.brand}</h1>
                              <div className="modal-price">
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
                                        {item.color ? (
                                          <h3 className="modal-att-name">
                                            {att.name}:
                                          </h3>
                                        ) : null}
                                        {item.color ? (
                                          <button
                                            className="color-att"
                                            style={{
                                              backgroundColor: `${item.color}`,
                                            }}
                                          ></button>
                                        ) : null}
                                      </div>
                                    );
                                  } else if (att.name === "Size") {
                                    return (
                                      <div key={att.id}>
                                        <h3 className="modal-att-name">
                                          {att.name}:
                                        </h3>
                                        <button className="other-att">
                                          {item.other[0]}
                                        </button>
                                      </div>
                                    );
                                  } else if (att.name === "Capacity") {
                                    return (
                                      <div key={att.id}>
                                        <h3 className="modal-att-name">
                                          {att.name}:
                                        </h3>
                                        <button className="other-att">
                                          {item.other[0]}
                                        </button>
                                      </div>
                                    );
                                  } else if (att.name === "With USB 3 ports") {
                                    return (
                                      <div key={att.id}>
                                        <h3 className="modal-att-name">
                                          {att.name}:
                                        </h3>
                                        <button className="other-att">
                                          {item.other[1]}
                                        </button>
                                      </div>
                                    );
                                  } else if (
                                    att.name === "Touch ID in keyboard"
                                  ) {
                                    return (
                                      <div key={att.id}>
                                        <h3 className="modal-att-name">
                                          {att.name}:
                                        </h3>
                                        <button className="other-att">
                                          {item.other[2]}
                                        </button>
                                      </div>
                                    );
                                  }
                                })}
                              </div>
                            </div>
                            <div className="modal-item-selection">
                              <div className="modal-item-select">
                                <button
                                  onClick={() => selectedItem(item, null)}
                                >
                                  +
                                </button>
                                <span>{item.qty}</span>
                                <button onClick={() => removeItem(item)}>
                                  -
                                </button>
                              </div>
                              <img src={item.gallery[0]} alt="" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <p className="total">
                      Total: <span>${total.toFixed(2)}</span>
                    </p>
                    <Link to={"/cart"}>
                      <button className="view-bag">VIEW BAG</button>
                    </Link>
                    <button className="check-out">CHECK OUT</button>
                  </div>
                </div>
              )}
            </>
          );
        }}
      </CartConsumer>,
      document.getElementById("portal")
    );
  }
}

Modal.contextType = LoadingContext;

export default Modal;
