import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import Home from './components/Home';
import ViewCountry from './components/ViewCountry';
import { connect } from 'react-redux';


class Routes extends Component {
    constructor(props){
        super(props);
    }

  render() {
    return (
        <React.Fragment>
        {/* <div>
            <span>
            <Link to="/"> Home </Link>
          </span>
        </div> */}
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/country/:name" component={ViewCountry} />
        </Switch>
        </React.Fragment>
    )
  }
}

export default connect(null, null)(Routes);