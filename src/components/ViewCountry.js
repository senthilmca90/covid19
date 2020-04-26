import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCountryCases } from '../actions/covidAction'

export class ViewCountry extends Component {
    constructor(props){
        super(props)
        console.log(props.match.params)
        const { name } = props.match.params
        this.props.getCountryCases(name)

        this.state = {
            name : name
        }
    }
    render() {
        const { countrycases: {data} } = this.props.covids
        console.log(`countrycases `, this.props.covids.countrycases)
        return (
            <div>
                <div className="row">
            <div className="col-md-12">
                <h2>{this.state.name} Coronovirus Cases</h2>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    covids : state.covids
})

const mapDispatchToProps = dispatch => ({
    getCountryCases : (name) => dispatch(getCountryCases(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewCountry)
