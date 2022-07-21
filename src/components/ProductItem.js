import { Component } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../helper/Context";

class ProductItem extends Component {
  constructor(props) {
    // console.log(props);
    super(props);
    this.state = {
      isMousedOver: false,
      attributes: {
        color: "",
        others0: "",
        others1: "",
        others2: "",
      },
    };
  }

  MouseOver() {
    this.setState({
      isMousedOver: true,
    });
  }

  MouseOut() {
    this.setState({
      isMousedOver: false,
    });
  }

  render() {
    const { selectedItem } = this.context;
    return (
      <div
        className="card"
        onMouseOver={() => this.MouseOver()}
        onMouseOut={() => this.MouseOut()}
      >
        <Link to={`/item/${this.props.item.id}`}>
          <div>
            <img
              src={this.props.item.gallery[0]}
              alt="product"
              className="product-image"
            />
            <h4>{this.props.item.name}</h4>
            {this.props.item.inStock ? null : (
              <p className="stock">Out Of Stock</p>
            )}
            <p>
              <span>
                {this.props.item.prices[this.props.select].currency.symbol}
              </span>
              {this.props.item.prices[this.props.select].amount}
            </p>
          </div>
        </Link>
        <div>
          {this.state.isMousedOver && (
            <div
              className="add-to-cart"
              onClick={() => {
                if (this.props.item.inStock) {
                  selectedItem(this.props.item, this.state.attributes);
                }
              }}
            >
              <FiShoppingCart className="add-to-cart-icon" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

ProductItem.contextType = CartContext;

export default ProductItem;
