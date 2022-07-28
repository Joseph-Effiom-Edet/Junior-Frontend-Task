import { Component } from "react";
import Navbar from "../components/Navbar";
import { productQuery } from "../queries/queries";
import { Query } from "@apollo/client/react/components";
import { withRouter } from "../HOC/WithRouter";
import DescriptionLayout from "../components/DescriptionLayout";

class Description extends Component {
  render() {
    const { location } = this.props;
    const cat = location.pathname.split("/")[2];

    return (
      <>
        <Navbar />
        <Query
          query={productQuery}
          variables={{ id: cat }}
          fetchPolicy="network-only"
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading...</div>;
            } else if (error) {
              return <div>Error fetching product...</div>;
            } else {
              console.log(data);
              const pro = data.product;
              return <DescriptionLayout productid={cat} data={pro} />;
            }
          }}
        </Query>
      </>
    );
  }
}

export default withRouter(Description);
