import React, { Component } from 'react';
import { ApolloClient, createNetworkInterface, gql, graphql, ApolloProvider } from 'react-apollo';
import Sidebar from 'react-sidebar';
import SideBarContent from './SideBarContent.js';
import Table from './Table.js';
import logo from './one-suncorp-logo.svg';
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
    customer(id: "1589631e-2625-4832-a09c-e64eceecb132") {
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

var currentAccount = "Checking Account...";

const CustomersList = ({ data: {loading, error, customer }}) => {
   if (loading) {
     return <p>Loading ...</p>;
   }
   if (error) {
     return <p>{ error.message }</p>;
   }
   var everydayOptions = customer.bankAccounts.find(b => b.product == "Everyday Options");
   var accountBSBAndNumber = everydayOptions.bsb + "  " + everydayOptions.accountNumber;
   return (
     <div>
       <div className="App-Logo">
         <img src={logo} alt="one-suncorp-logo" style={logoImageStyles}/>
       </div>
       <div className="App-header">
         <h1>{everydayOptions.product}</h1>
         <h2>{accountBSBAndNumber}</h2>
       </div>
       <Table data={ everydayOptions.bankTransactions } style={ tableStyles } />
     </div>);
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

const tableStyles = {
  marginTop: '100px'
}

const logoImageStyles = {
   width: '200px',
   marginTop: '20px',
   marginBottom: '20px',
   float: 'right'
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
    var sidebarContent = <SideBarContent />;

    return (
        <Sidebar styles={sidebarStyles} 
               sidebar={sidebarContent}
               open={this.state.sidebarOpen}
               docked={this.state.sidebarDocked}
               onSetOpen={this.onSetSidebarOpen}>
          <ApolloProvider client={client}>
          <div className="App" style={mainStyles}>
              <CustomersListWithData />
          </div>
          </ApolloProvider>
        </Sidebar>
    );
  }
}

export default App;
