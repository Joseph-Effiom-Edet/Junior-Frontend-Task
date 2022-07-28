import { Component } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { CartContext } from "../helper/Context";

class ProductItem extends Component {
  constructor(props) {
    super(props);
    const colorAttributes = props.item.attributes
      .filter((x) => x.type === "swatch")
      .map((x) => x.items[0].value);
    const otherAttributes = props.item.attributes
      .filter((x) => x.type !== "swatch")
      .map((x) => x.items[0].value);
    // console.log(props);
    this.state = {
      isMousedOver: false,
      attributes: {
        color: props.item.attributes.length === 2 ? colorAttributes[0] : "",
        others0: props.item.attributes.length > 0 ? otherAttributes[0] : "",
        others1: props.item.attributes.length > 2 ? otherAttributes[1] : "",
        others2: props.item.attributes.length > 2 ? otherAttributes[2] : "",
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
    // console.log(this.state.attributes.color);
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
            <h4>{this.props.item.brand}</h4>
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
