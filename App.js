import React, { Component } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home';

export class App extends Component {
  constructor(props) {
    super(props);
  }

render() {
    return (
            <div>
                <BrowserRouter>
                    <Switch>

                        {/* Otherwise, render the Landing component */}
                        <Route path="/" component={Home} />

                    </Switch>
                </BrowserRouter>
            </div>
    );
}
}

export default App;

