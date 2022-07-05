import React, { Component } from "react";

const LoadingContext = React.createContext()
const LoadingConsumer = LoadingContext.Consumer
const CartContext = React.createContext()
const CartConsumer = CartContext.Consumer

class LoadingProvider extends Component {

    state = {
        filter: "all",
        select: 0,
    }

    load = (e) => {
        this.setState({
            filter: e.target.innerHTML.toLowerCase(),
        })
    }

    selection = (e) => {
        if(e.target.innerHTML === "£ GBP"){
            this.setState({
                filter: this.state.filter,
                select: 1
            })
          }else if(e.target.innerHTML === "A$ AUD"){
            this.setState({
                filter: this.state.filter,
                select: 2
            })
          } else if(e.target.innerHTML === "¥ JPY"){
            this.setState({
                filter: this.state.filter,
                select: 3
            })
          }else if (e.target.innerHTML === "₽ RUB"){
            this.setState({
                filter: this.state.filter,
                select: 4
            })
          }else if(e.target.innerHTML === "$ USD"){
            this.setState({
                filter: this.state.filter,
                select: 0
            })
          }
    }


    render() {
        const {filter, select} = this.state
        const {load, selection} = this
        return(
            <LoadingContext.Provider value={{
                filter,
                select,
                load,
                selection,
                
            }}>
                {this.props.children}
            </LoadingContext.Provider>
        )
    }
}

class CartProvider extends Component {
    state = {
        cartItem: [],
        qty: 0
    }


    selectedItem = (props, props2) => {
        const exists = this.state.cartItem.find((x) => x.id === props.id);
        if(exists){
            this.setState({
                cartItem: this.state.cartItem.map((x) => x.id === props.id ? {...exists, qty: exists.qty + 1 } : x),
                qty: this.state.qty + 1,
            })
        }else {
            this.setState({
                cartItem: [...this.state.cartItem, {...props, qty: 1, color: props2.att1, other: props2.att2}],
                qty: this.state.qty + 1
            })
        }
        
    }

    removeItem = (props) => {
        const exists = this.state.cartItem.find((x) => x.id === props.id);
        if(exists.qty === 1) {
            this.setState({
                cartItem: this.state.cartItem.filter(x => x.id !== props.id),
                qty: this.state.qty - 1,
            })
        }else {
            this.setState({
                cartItem: this.state.cartItem.map((x) => x.id === props.id ? {...exists, qty: exists.qty - 1 } : x),
                qty: this.state.qty - 1,
            })
        }
    }

    render() {
        const { cartItem, qty } = this.state
        const { selectedItem, removeItem } = this
        return (
            <CartContext.Provider value={{
                cartItem,
                qty,
                selectedItem,
                removeItem
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}

export {LoadingContext, CartContext, LoadingConsumer, CartConsumer, LoadingProvider, CartProvider};
