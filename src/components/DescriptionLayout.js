/* eslint-disable array-callback-return */
import { Component } from "react";
import { productQuery } from "../queries/queries";
import { Query } from "@apollo/client/react/components";
import { LoadingConsumer, CartContext } from "../helper/Context";


class DescriptionLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: props.data.gallery[0],
      att1: null,
      att2: [],
      colorId: "",
      otherId1: "",
      otherId2: "",
      otherId3: ""
      
    };
  }

  HandleClick(e) {
    this.setState({
      src: e.target.src,
    });
  }

  SelectedAtt(e) {
    if (e.target.name === "att1") {
      this.setState({src: this.state.src, att1: e.target.value, att2: this.state.att2, colorId: e.target.id, otherId: this.state.otherId})
    }else if (e.target.name === "att2") {
      this.setState({src: this.state.src, att1: this.state.att1, att2: [...this.state.att2, e.target.value], colorId: this.state.colorId, otherId1: e.target.id})
    }else if (e.target.name === "att3") {
      this.setState({src: this.state.src, att1: this.state.att1, att2: [...this.state.att2, e.target.value], colorId: this.state.colorId, otherId1: this.state.otherId1, otherId2: e.target.id})
    }else if (e.target.name === "att4") {
      this.setState({src: this.state.src, att1: this.state.att1, att2: [...this.state.att2, e.target.value], colorId: this.state.colorId, otherId1: this.state.otherId1, otherId2: this.state.otherId2, otherId3: e.target.id})
    }
  }

 
  render() {
    const { selectedItem } = this.context
    return (
      <LoadingConsumer>
        {({ select }) => {
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
                    <div className="description-container">
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
                      <div>
                        <img
                          className="description-image1"
                          src={this.state.src}
                          alt="Click the images on the left"
                        />
                      </div>
                      <div className="description-info">
                        <h1>{product.name}</h1>
                        <h3>{product.brand}</h3>
                        <div>
                          {product.attributes.map((att) => {
                            if (att.type === "swatch") {
                              return (
                                <div key={att.id}>
                                  <h4 className="att-name">
                                    {att.name.toUpperCase()}:
                                  </h4>
                                  <div className="att-div">
                                    {att.items.map((item) => {
                                      const id = item.id
                                      return (
                                        <button
                                          className="att-item"
                                          key={item.id}
                                          id={item.id}
                                          name="att1"
                                          value={item.value}
                                          onClick={(e) => this.SelectedAtt(e)}
                                          style={id === this.state.colorId ? {backgroundColor: `${item.value}`, border: "1px solid #5ECE7B"}:{
                                            backgroundColor: `${item.value}`
                                          }}
                                        ></button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            } else if(att.name === "With USB 3 ports") {
                              return (
                                <div key={att.id}>
                                  <h4 className="att-name">
                                    {att.name.toUpperCase()}:
                                  </h4>
                                  <div className="att-div">
                                    {att.items.map((item) => {
                                      const id = item.id
                                      return (
                                        <button
                                          className="att-item1"
                                          key={item.id}
                                          id={item.id}
                                          style={id === this.state.otherId2 ? {backgroundColor: "black", color: "white"} : null}
                                          name="att3"
                                          value={item.value}
                                          onClick={(e) => this.SelectedAtt(e)}
                                        >
                                          {item.value}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            } else if(att.name === "Touch ID in keyboard") {
                              return (
                                <div key={att.id}>
                                  <h4 className="att-name">
                                    {att.name.toUpperCase()}:
                                  </h4>
                                  <div className="att-div">
                                    {att.items.map((item) => {
                                      const id = item.id
                                      return (
                                        <button
                                          className="att-item1"
                                          key={item.id}
                                          id={item.id}
                                          style={id === this.state.otherId3 ? {backgroundColor: "black", color: "white"} : null}
                                          name="att4"
                                          value={item.value}
                                          onClick={(e) => this.SelectedAtt(e)}
                                        >
                                          {item.value}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div key={att.id}>
                                  <h4 className="att-name">
                                    {att.name.toUpperCase()}:
                                  </h4>
                                  <div className="att-div">
                                    {att.items.map((item) => {
                                      const id = item.id
                                      return (
                                        <button
                                          className="att-item1"
                                          key={item.id}
                                          id={item.id}
                                          style={id === this.state.otherId1 ? {backgroundColor: "black", color: "white"} : null}
                                          name="att2"
                                          value={item.value}
                                          onClick={(e) => this.SelectedAtt(e)}
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
                        <button className="add-to-cart-button" onClick={() => selectedItem(this.props.data, this.state, select)}>
                          ADD TO CART
                        </button>
                        <div
                          className="description"
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        ></div>
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
