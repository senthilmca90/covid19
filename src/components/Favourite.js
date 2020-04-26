import React, { Component } from 'react'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Link } from 'react-router-dom';
const { SearchBar } = Search;

export const actionFormatter = (cell, row, rowIndex) => {
        return (
            <div>
                <Link to={`/country/${cell}`}> {cell} </Link>
            </div>
        )
}



export class Favourite extends Component {

    onPinnedFormatter = (cell, row, rowIndex) => {
        console.log(`cell `, cell)
            return (
                <div>
                    { (cell == true) &&

                        <button className="btn btn-sm btn-outline-info" onClick={() => this.props.onFavouriteHandler(false, row)}> Un Pin </button>
                        }
                </div>
            )
    }

render(){
    const { data } = this.props

    const favdata = data.filter(d => d.pin === true)
    const columns = [{
        dataField: 'location',
        text: 'Location',
        formatter: actionFormatter.bind(this)
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

{favdata &&

<ToolkitProvider
  keyField="location"
  data={ favdata }
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

