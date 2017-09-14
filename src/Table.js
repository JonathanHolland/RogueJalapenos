import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

/* Make a query here through graphql for bankTransactions for this user */

export default class Table extends React.Component {
    render() {
        return (
            <div className="Container" style={ this.props.style }>
            <BootstrapTable data={this.props.data} striped hover condensed>
                <TableHeaderColumn dataField='id' isKey>Transaction ID</TableHeaderColumn>
                <TableHeaderColumn dataField='type'>Type</TableHeaderColumn>
                <TableHeaderColumn dataField='effect'>Effect</TableHeaderColumn>
                <TableHeaderColumn dataField='amount'>Amount</TableHeaderColumn>
                <TableHeaderColumn dataField='memo'>Memo</TableHeaderColumn>
                <TableHeaderColumn dataField='postedDate'>Date</TableHeaderColumn>
            </BootstrapTable>
            </div>
        );
    }
}