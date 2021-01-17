import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import Result from './components/Result/Result';
import history from './history';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Router history={history}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/game" component={Game} />
              <Route path="/result" component={Result} />
            </Switch>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;