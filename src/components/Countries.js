import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useTable, getTableBodyProps, getTableProps, headerGroups, rows, prepareRow } from 'react-table'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

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


    const defaultSorted = [{
        dataField: 'active',
        order: 'desc'
      }];


    const columns = [{
        dataField: 'location',
        text: 'Location',
        sort : true,
        formatter: this.actionFormatter.bind(this)
      }, {
        dataField: 'confirmed',
        text: 'Total Cases',
        sort : true
      }, {
        dataField: 'active',
        text: 'Active Cases',
        sort : true,
        filter: textFilter()
      },{
        dataField: 'deaths',
        text: 'Total Deaths',
        sort : true,
        filter: textFilter()
      }, {
        dataField: 'recovered',
        text: 'Total Recovered',
        sort : true
      }, {
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
  filter={ filterFactory() }
  defaultSorted={ defaultSorted }
  noDataIndication={() => (<div>No data available</div>)}
>
  {
    props => (
      <div>
        <h5>Search</h5>
        <SearchBar  { ...props.searchProps } />
        <hr />
        <BootstrapTable
        filter={ filterFactory() }
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
