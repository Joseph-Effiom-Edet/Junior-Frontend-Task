/* eslint-disable array-callback-return */
import { Component } from "react";
import { productQuery } from "../queries/queries";
import { Query } from "@apollo/client/react/components";
import { LoadingConsumer, CartContext } from "../helper/Context";
import parse from "html-react-parser";

class DescriptionLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.data.gallery[0],
      attributes: {
        color: "",
        others0: "",
        others1: "",
        others2: "",
      },
    };
  }

  HandleClick(e) {
    this.setState({
      src: e.target.src,
    });
  }

  render() {
    // console.log(this.state.attributes);
    const { selectedItem } = this.context;
    return (
      <LoadingConsumer>
        {({ select, outsidePriceClick }) => {
          return (
            <Query
              query={productQuery}
              variables={{ id: this.props.productid }}
            >
              {({ loading, error, data }) => {
                if (loading) {
                  return <div>Loading...</div>;
                } else if (error) {
                  return <div>Error fetching product...</div>;
                } else {
                  const product = data.product;
                  return (
                    <div
                      className="description-container"
                      onClick={() => outsidePriceClick()}
                    >
                      <div className="description-image-list">
                        {product.gallery.map((pic) => {
                          return (
                            <img
                              key={pic}
                              src={pic}
                              alt=""
                              className="description-image"
                              onClick={(e) => this.HandleClick(e)}
                            />
                          );
                        })}
                      </div>
                      <div className="big-image">
                        <img
                          className="description-image1"
                          src={this.state.src}
                          alt="Click the images on the left"
                        />
                        {product.inStock ? null : (
                          <p className="description-page-stock">Out Of Stock</p>
                        )}
                      </div>
                      <div className="description-info">
                        <h1>{product.name}</h1>
                        <h3>{product.brand}</h3>
                        <div>
                          {product.attributes.map((att, index) => {
                            if (att.type === "swatch") {
                              return (
                                <div key={att.id}>
                                  <h4 className="att-name">
                                    {att.name.toUpperCase()}:
                                  </h4>
                                  <div className="att-div">
                                    {att.items.map((item) => {
                                      const value = item.value;
                                      return (
                                        <button
                                          className="att-item"
                                          key={item.id}
                                          id={item.id}
                                          name="color-att"
                                          value={item.value}
                                          onClick={(e) => {
                                            this.setState({
                                              ...this.state,
                                              attributes: {
                                                ...this.state.attributes,
                                                color: e.target.value,
                                              },
                                            });
                                          }}
                                          style={
                                            value ===
                                            this.state.attributes.color
                                              ? {
                                                  backgroundColor: `${item.value}`,
                                                  border: "1px solid #5ECE7B",
                                                }
                                              : {
                                                  backgroundColor: `${item.value}`,
                                                }
                                          }
                                        ></button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div key={att.id}>
                                  <h4 className="att-name">
                                    {att.name.toUpperCase()}
                                  </h4>
                                  <div className="att-div">
                                    {att.items.map((item) => {
                                      const value = item.value;
                                      return (
                                        <button
                                          className="att-item1"
                                          name="other-att"
                                          value={item.value}
                                          key={item.id}
                                          style={
                                            value ===
                                            this.state.attributes.others0
                                              ? {
                                                  backgroundColor: "black",
                                                  color: "white",
                                                }
                                              : value ===
                                                this.state.attributes.others1 && index === 1
                                              ? {
                                                  backgroundColor: "black",
                                                  color: "white",
                                                }
                                              : value ===
                                                this.state.attributes.others2 && index === 2
                                              ? {
                                                  backgroundColor: "black",
                                                  color: "white",
                                                }
                                              : null
                                          }
                                          onClick={(e) => {
                                            if (index === 0) {
                                              this.setState({
                                                ...this.state,
                                                attributes: {
                                                  ...this.state.attributes,
                                                  others0: e.target.value,
                                                },
                                              });
                                            } else if (index === 1) {
                                              this.setState({
                                                ...this.state,
                                                attributes: {
                                                  ...this.state.attributes,
                                                  others1: e.target.value,
                                                },
                                              });
                                            } else if (index === 2) {
                                              this.setState({
                                                ...this.state,
                                                attributes: {
                                                  ...this.state.attributes,
                                                  others2: e.target.value,
                                                },
                                              });
                                            }
                                          }}
                                        >
                                          {item.value}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>

                        <div className="att-div">
                          <h4 className="att-name">PRICE:</h4>
                          <p>
                            <span>
                              {product.prices[select].currency.symbol}
                            </span>
                            {product.prices[select].amount}
                          </p>
                        </div>
                        <button
                          className="add-to-cart-button"
                          onClick={() => {
                            if (product.inStock) {
                              if (product.attributes.length === 2) {
                                if (
                                  this.state.attributes.color.length > 0 &&
                                  this.state.attributes.others0.length > 0
                                ) {
                                  selectedItem(
                                    product,
                                    this.state.attributes,
                                  );
                                } else {
                                  return;
                                }
                              } else if (product.attributes.length === 1) {
                                if (
                                  this.state.attributes.color.length > 0 ||
                                  this.state.attributes.others0.length > 0
                                ) {
                                  selectedItem(
                                    product,
                                    this.state.attributes,
                                  );
                                } else {
                                  return;
                                }
                              } else if (product.attributes.length < 1) {
                                selectedItem(
                                  product,
                                  this.state,
                                );
                              } else if (
                                product.attributes.length > 2 &&
                                product.attributes.type !== "swatch"
                              ) {
                                if (
                                  this.state.attributes.color.length === 0 &&
                                  this.state.attributes.others0.length > 0 &&
                                  this.state.attributes.others1.length > 0 &&
                                  this.state.attributes.others2.length > 0
                                ) {
                                  selectedItem(
                                    product,
                                    this.state.attributes,
                                  );
                                } else {
                                  return;
                                }
                              }
                            } else {
                              return;
                            }
                          }}
                        >
                          ADD TO CART
                        </button>
                        <div className="description">
                          {parse(`${product.description}`)}
                        </div>
                      </div>
                    </div>
                  );
                }
              }}
            </Query>
          );
        }}
      </LoadingConsumer>
    );
  }
}

DescriptionLayout.contextType = CartContext;

export default DescriptionLayout;
