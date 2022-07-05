import { Component } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

class ProductItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isMousedOver: false,
        }
    }

    MouseOver(){
        this.setState({
            isMousedOver: true
        })
    }

    MouseOut(){
        this.setState({
            isMousedOver: false
        })
    }

    render(){
        return(
            <Link to={`/item/${this.props.item.id}`}>
                <div className="card" onMouseOver={() => this.MouseOver()} onMouseOut={() => this.MouseOut()}>
                    <img src={this.props.item.gallery[0]} alt="product" className="product-image"/>
                    <h4>{this.props.item.name}</h4>
                    {this.props.item.inStock ? null : <p className="stock">Out Of Stock</p>}
                    <p><span>{this.props.item.prices[this.props.select].currency.symbol}</span>{this.props.item.prices[this.props.select].amount}</p>
                    {this.state.isMousedOver && <div className="add-to-cart"><FiShoppingCart className="add-to-cart-icon"/></div>}
                </div>
            </Link>
        )
    }
}

export default ProductItem