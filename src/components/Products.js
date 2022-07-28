import { Component } from "react";
import { categoryQuery } from "../queries/queries";
import ProductItem from "./ProductItem";
import { Query } from "@apollo/client/react/components";
import { LoadingContext } from "../helper/Context";

class Products extends Component {
  render() {
    const { filter, select, outsidePriceClick } = this.context;
    return (
      <div onClick={() => outsidePriceClick()}>
        <Query
          query={categoryQuery}
          variables={{ title: filter }}
          fetchPolicy="no-cache"
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading Category Heading...</div>;
            } else if (error) {
              return <div>Error Fetching Category Heading</div>;
            } else {
              const categoryHeading = data.category.name;
              return (
                <div>
                  <h1 className="category-heading">
                    {categoryHeading.toUpperCase()}
                  </h1>
                </div>
              );
            }
          }}
        </Query>
        <Query
          query={categoryQuery}
          variables={{ title: filter }}
          fetchPolicy="no-cache"
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading Categories Products...</div>;
            } else if (error) {
              return <div>Error Fetching Categories Products...</div>;
            } else {
              const categories = data.category.products;
              return (
                <div className="product-container">
                  {categories.map((cat) => {
                    return (
                      <ProductItem item={cat} key={cat.id} select={select} />
                    );
                  })}
                  ;
                </div>
              );
            }
          }}
        </Query>
      </div>
    );
  }
}

Products.contextType = LoadingContext;

export default Products;
