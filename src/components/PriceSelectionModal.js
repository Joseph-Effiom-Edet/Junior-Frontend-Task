import { Component } from "react";
import { Currency } from "../queries/queries";
import { Query } from "@apollo/client/react/components";
import { LoadingContext } from "../helper/Context";

class PriceSelectionModal extends Component {
  render() {
    const {selection} = this.context; 
    return (
      <Query query={Currency}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading Currencies...</div>;
          } else if (error) {
            return <div>Error Loading Currencies...</div>;
          } else {
            const currencies = data.currencies;
            return (
              <div className="currency-modal">
                {currencies.map((currency) => {
                  return (
                    <div key={currency.label} onClick={() => {this.props.priceClick()}}><p onClick={(e) => selection(e)}>
                      {currency.symbol} {currency.label}
                    </p></div>
                  );
                })}
              </div>
            );
          }
        }}
      </Query>
    );
  }
}

PriceSelectionModal.contextType = LoadingContext;

export default PriceSelectionModal
