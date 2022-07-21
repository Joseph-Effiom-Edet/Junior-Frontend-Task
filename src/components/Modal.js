/* eslint-disable array-callback-return */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CartConsumer, LoadingContext } from "../helper/Context";
import { Link } from "react-router-dom";
import { Query } from "@apollo/client/react/components";
import { Currency } from "../queries/queries";

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
          const itemsPrice = cartItem.reduce(
            (a, b) => a + b.prices[select].amount * b.qty,
            0
          );
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
                        <div key={item.cartId}>
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
                                {item.attributes.map((att, index) => {
                                   if(att.type === "swatch") {
                                    return (
                                      <div key={att.id}>
                                        <h4 className="modal-att-name">{att.name}</h4>
                                        <div>{att.items.map(attItem => {
                                          const value = attItem.value;
                                          return (
                                            <button
                                            key={item.id}
                                            className="modal-color-att"
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
                                        <h4 className="modal-att-name">{att.name}</h4>
                                        <div>{att.items.map(attItem => {
                                          const value = attItem.value;
                                          return (
                                            <button key={attItem.id} className="modal-other-att" style={
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
                            <div className="modal-item-selection">
                              <div className="modal-item-select">
                                <button
                                  onClick={() => selectedItem(item, item)}
                                >
                                  +
                                </button>
                                <span className="modal-qty">{item.qty}</span>
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
                    <Query query={Currency}>
                      {({ loading, error, data }) => {
                        if (loading) {
                          return;
                        } else if (error) {
                          return;
                        } else {
                          const currencySymbol = data.currencies;
                          return (
                            <div>
                              <p className="total">
                                Total: <span>{currencySymbol[select].symbol}{total.toFixed(2)}</span>
                              </p>
                              <Link to={"/cart"}>
                                <button className="view-bag">VIEW BAG</button>
                              </Link>
                              <button className="check-out">CHECK OUT</button>
                            </div>
                          );
                        }
                      }}
                    </Query>
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
