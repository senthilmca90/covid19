import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useTable, getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } from 'react-table'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Link } from 'react-router-dom';
const { SearchBar } = Search;

export class Countries extends Component {
    constructor(props){
        super(props)
    }

    actionFormatter = (cell, row, rowIndex) => {
            return (
                <div>
                    <Link to={`/country/${cell}`}> {cell} </Link>
                </div>
            )
    }

    onPinnedFormatter = (cell, row, rowIndex) => {
            return (
                <div>
                    { (cell == true) ?
                        <div>Pinned</div>
                        :
                        <button className="btn btn-sm btn-outline-info" onClick={() => this.props.onFavouriteHandler(true, row)}> Pin </button>
                    }
                </div>
            )
    }

render(){
    const data = this.props.data
    console.log(`data `, data)

    const columns = [{
        dataField: 'location',
        text: 'Location',
        formatter: this.actionFormatter.bind(this)
      }, {
        dataField: 'confirmed',
        text: 'Total Cases'
      }, {
        dataField: 'deaths',
        text: 'Total Deaths'
      }, {
        dataField: 'recovered',
        text: 'Total Recovered'
      }, {
        dataField: 'active',
        text: 'Active Cases'
      },{
          dataField: 'pin',
          text: 'Pin as Favourite',
          formatter: this.onPinnedFormatter.bind(this)
      }
    ];
    return (
        <div>

{data &&

<ToolkitProvider
  keyField="location"
  data={ data }
  columns={ columns }
  search
  noDataIndication={() => (<div>No data available</div>)}
>
  {
    props => (
      <div>
        <h5>Search Countries</h5>
        <SearchBar  { ...props.searchProps } />
        <hr />
        <BootstrapTable
          { ...props.baseProps }
        />
      </div>
    )
  }
</ToolkitProvider>

}


        </div>
    )
}
}
