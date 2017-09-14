import React, { Component } from 'react';
import { ApolloClient, createNetworkInterface, gql, graphql, ApolloProvider } from 'react-apollo';
import logo from './logo.svg';
import './App.css';

const networkInterface = createNetworkInterface({
  uri: 'https://api.sunhack.suncorp.com.au/graphql',
  opts: {
    headers: {'x-api-key': "A3XDgfMQm78cEB86wS6B8a1WWMVbcofQ5Iu5k3DH"} 
  }
});

const client = new ApolloClient({
  networkInterface
});

const customersListQuery = gql `
  {
    customers {
      id
      title
      firstName
      lastName
      dateOfBirth
      gender
      tenure
      bankAccounts {
        id
        type
        product
        title
        brand
        currency
        bsb
        accountNumber
        currentBalance
        currentInterestRate
        bankTransactions {
          id
          type
          effect
          amount
          memo
          postedDate
          effectiveDate
        }
      }
    }
  }
`;

const CustomersList = ({ data: {loading, error, customers }}) => {
   if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{error.message}</p>;
   }
   return <ul>
     { customers.map( c => <li key={c.id}>{c.firstName} {c.lastName}</li> ) }
   </ul>;
 };

const CustomersListWithData = graphql(customersListQuery)(CustomersList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <CustomersListWithData />
      </div>
      </ApolloProvider>
    );
  }
}

export default App;
