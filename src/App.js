import React, { Component } from 'react';
import { ApolloClient, gql, graphql, ApolloProvider } from 'react-apollo';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient();

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

const CustomersList = ({ data: {loading, error, channels }}) => {
   if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{error.message}</p>;
   }
   return <ul>
     { channels.map( ch => <li key={ch.id}>{ch.name}</li> ) }
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
