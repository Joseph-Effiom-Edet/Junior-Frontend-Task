import { gql } from "@apollo/client";

const Currency = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

const categoriesQuery = gql`
  query {
    categories {
      name
    }
  }
`;

const categoryQuery = gql`
  query ($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        brand
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        inStock
        gallery
        category
        attributes {
          id
          name
          type
          items {
            id
            value
            displayValue
          }
        }
        description
      }
    }
  }
`;

const productQuery = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      brand
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      inStock
      gallery
      category
      attributes {
        id
        name
        type
        items {
          id
          value
          displayValue
        }
      }
      description
    }
  }
`;

export { Currency, categoriesQuery, categoryQuery, productQuery };
