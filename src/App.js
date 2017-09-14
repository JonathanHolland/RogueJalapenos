import React, { Component } from 'react';
import { ApolloClient, createNetworkInterface, gql, graphql, ApolloProvider } from 'react-apollo';
import Sidebar from 'react-sidebar';
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

const mql = window.matchMedia(`(min-width: 800px)`);

const sidebarStyles = {
    sidebar: {
        backgroundColor: '#577492',
        opacity: '20%', 
        width: '300px'
    }
}

const mainStyles = {
   margin: '40px'
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mql: mql,
      docked: props.docked,
      open: props.open
    }

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({sidebarDocked: this.state.mql.matches});
  }
  
  render() {
    var sidebarContent = <b>Sidebar content</b>;

    return (
        <Sidebar styles={sidebarStyles} 
               sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               docked={this.state.sidebarDocked}
               onSetOpen={this.onSetSidebarOpen}>
          <ApolloProvider client={client}>
          <div className="App" style={mainStyles}>
            <div className="App-header">
            <h2>Transaction Account - 3331 2349</h2>
            </div>
            <CustomersListWithData />
          </div>
          </ApolloProvider>
        </Sidebar>

    );
  }
}

export default App;
