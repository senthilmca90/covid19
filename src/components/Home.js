import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Link } from 'react-router-dom';
import { getCovidTotal, getCurrent, updateCovid } from '../actions/covidAction'
import { Countries } from './Countries'
import { Favourite } from './Favourite'
const { SearchBar } = Search;
export class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            active : true
        }
        this.props.getCovidTotal()
        this.props.getCurrent()
    }
    static propTypes = {
        covids: PropTypes.object.isRequired,
        getCovidTotal:PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        if(prevProps.covids.current !== this.props.covids.current) {
          this.setState({current: this.props.covids.current});
        }
      }


    onFavouriteHandler = (arg1, arg2) => {
        console.log(`props `, this.props.current)

        const updatedVal = {...arg2, pin: arg1}
        console.log(`updatedVal `, updatedVal)
        this.props.updateCovid(updatedVal);

    }

    render() {
        const { totals : { data }, current, timeseries } = this.props.covids

        const ccdata = current.data;

        // console.log(`ccdata `, ccdata)
        // if(ccdata){
        //     ccdata = ccdata.sort((a, b) => parseFloat(b.active) - parseFloat(a.active))
        // console.log(`ccdata `, ccdata)

        // }

        // current.data = current.data.
        // sort((a, b) => parseFloat(a.active) - parseFloat(b.active));

        const divStyle={
            overflowY: 'scroll',
            height:'500px',
            position:'relative'
          };



        return (
            <div>
            <div className="row">
            <div className="col-md-12">
                <h2>Coronovirus Cases</h2>
                <div> {data && data.confirmed} </div>
            </div>
            <div className="col-md-6">
                <h3 style={{color:'green'}}> Cases Recovered</h3>
                <div> {data && data.recovered} </div>
            </div>
            <div className="col-md-6">
                <h3> Active Cases</h3>
                <div> {data && data.active} </div>
                </div>
                <div className="col-md-12">
                <h4 style={{color:'red'}}> Number of Deaths</h4>
                <div> {data && data.deaths} </div>
                </div>
            </div>
                <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10" style={divStyle}>

                <div>

                <ul className="nav nav-tabs">
        <div className="nav-item">
          <span className={this.state.active?'nav-link active':'nav-link'} onClick={() => this.setState({active: true})}>Home</span>
        </div>
        <div className="nav-item">
          <span className={!(this.state.active)?'nav-link active':'nav-link'} onClick={() => this.setState({active: false})} >Pin as favourite</span>
        </div>
      </ul>

                </div>

                {(this.state.active) && <Countries onFavouriteHandler={this.onFavouriteHandler} data={current.data} /> }

                {!(this.state.active) &&  <Favourite onFavouriteHandler={this.onFavouriteHandler} data={current.data} /> }

                    </div>
                    <div className="col-md-1"></div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    covids: state.covids
})

const mapDispatchToProps = dispatch => ({
    getCovidTotal: () => dispatch(getCovidTotal()),
    getCurrent: () => dispatch(getCurrent()),
    updateCovid: (data) => dispatch(updateCovid(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
