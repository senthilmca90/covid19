import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/configureStore'
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Router>

    <Provider store={store}>
        <Routes />
    </Provider>
    </Router>

    </div>

  );
}

export default App;
