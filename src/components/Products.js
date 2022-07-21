import { Component } from "react";
import { categoriesQuery } from "../queries/queries";
import ProductItem from "./ProductItem";
import { Query } from "@apollo/client/react/components";
import { LoadingContext } from "../helper/Context";

class Products extends Component {
  render() {
    const { filter, select, outsidePriceClick } = this.context;
    return (
      <div  onClick={() => outsidePriceClick()}>
        <Query query={categoriesQuery}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading Category Heading...</div>;
            } else if (error) {
              return <div>Error Fetching Category Heading</div>;
            } else {
              const categoryHeading = data.categories;
              return (
                <div>
                  {categoryHeading
                    .filter((category) => {
                      return category.name === filter;
                    })
                    .map((cat) => {
                      return <h1 key={cat.name} className="category-heading">{cat.name.toUpperCase()}</h1>;
                    })}
                </div>
              );
            }
          }}
        </Query>
        <Query query={categoriesQuery}>
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading Categories Products...</div>;
            } else if (error) {
              return <div>Error Fetching Categories Products...</div>;
            } else {
              const categories = data.categories;
              return (
                <div className="product-container">
                  {categories
                    .filter((category) => {
                      return category.name === filter;
                    })
                    .map((cat) => {
                      return cat.products.map((cor) => {
                        return (
                          <ProductItem
                            item={cor}
                            key={cor.id}
                            select={select}
                          />
                        );
                      });
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
