import React, { Component } from "react";
import { v4 as cartId } from "uuid";

const LoadingContext = React.createContext();
const LoadingConsumer = LoadingContext.Consumer;
const CartContext = React.createContext();
const CartConsumer = CartContext.Consumer;

class LoadingProvider extends Component {
  state = {
    filter: localStorage.getItem("filter") || "clothes",
    select: 0,
    clickedPrice: false,
  };

  load = (e) => {
    localStorage.setItem("filter", e.target.innerHTML.toLowerCase());
    this.setState({
      ...this.state,
      filter: e.target.innerHTML.toLowerCase(),
    });
  };

  selection = (index) => {
    this.setState({
      ...this.state,
      select: index,
    });
  };

  priceClick = () => {
    if (this.state.clickedPrice === false) {
      this.setState({
        ...this.state,
        clickedPrice: true,
      });
    } else {
      this.setState({
        ...this.state,
        clickedPrice: false,
      });
    }
  };

  outsidePriceClick = () => {
    this.setState({
      ...this.state,
      clickedPrice: false,
    });
  };

  render() {
    const { filter, select, clickedPrice } = this.state;
    const { load, selection, priceClick, outsidePriceClick } = this;
    return (
      <LoadingContext.Provider
        value={{
          filter,
          select,
          clickedPrice,
          load,
          selection,
          priceClick,
          outsidePriceClick,
        }}
      >
        {this.props.children}
      </LoadingContext.Provider>
    );
  }
}

class CartProvider extends Component {
  state = {
    cartItem: [],
    qty: 0,
  };

  selectedItem = (props, props2) => {
    const exists = this.state.cartItem.find((x) => x.cartId === props.cartId);
    if (exists) {
      this.setState({
        cartItem: this.state.cartItem.map((x) =>
          x.cartId === props.cartId ? { ...exists, qty: exists.qty + 1 } : x
        ),
        qty: this.state.qty + 1,
      });
    } else {
      this.setState({
        cartItem: [
          ...this.state.cartItem,
          {
            ...props,
            qty: 1,
            color: props2.color,
            others0: props2.others0,
            others1: props2.others1,
            others2: props2.others2,
            cartId: cartId(),
          },
        ],
        qty: this.state.qty + 1,
      });
    }
  };

  removeItem = (props) => {
    const exists = this.state.cartItem.find((x) => x.cartId === props.cartId);
    if (exists.qty === 1) {
      this.setState({
        cartItem: this.state.cartItem.filter((x) => x.cartId !== props.cartId),
        qty: this.state.qty - 1,
      });
    } else {
      this.setState({
        cartItem: this.state.cartItem.map((x) =>
          x.cartId === props.cartId ? { ...exists, qty: exists.qty - 1 } : x
        ),
        qty: this.state.qty - 1,
      });
    }
  };

  render() {
    console.log(this.state.cartItem);
    const { cartItem, qty } = this.state;
    const { selectedItem, removeItem } = this;
    return (
      <CartContext.Provider
        value={{
          cartItem,
          qty,
          selectedItem,
          removeItem,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export {
  LoadingContext,
  CartContext,
  LoadingConsumer,
  CartConsumer,
  LoadingProvider,
  CartProvider,
};
