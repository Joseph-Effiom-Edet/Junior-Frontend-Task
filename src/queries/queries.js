import { gql } from "@apollo/client";

const Currency = gql`
  query {
    currencies{
      label
      symbol
    }
  }
`

const categoriesQuery = gql`
  query {
    categories {
      name
      products{
        id
        name
        inStock
        gallery
        prices{
          amount
          currency{
            symbol
          }
        }
      }
    }
  }
`

const categoryQuery = gql`
  query {
    category {
      products{
        id
        name
        gallery
        category
      }
    }
  }
`

const productQuery = gql`
  query($id: String!){
    product(id: $id){
      id
      name
      brand
      prices{
        amount
        currency{
          label
          symbol
        }
      }
      inStock
      gallery
      category
      attributes{
        id
        name
        type
        items{
          id
          value
          displayValue
        }
      }
      description

    }
  }
`




export {Currency, categoriesQuery, categoryQuery, productQuery};