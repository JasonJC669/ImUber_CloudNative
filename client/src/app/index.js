import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Links, PassengerMap, DriverMap } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Links} />
                <Route path="/passenger" exact component={PassengerMap} />
                <Route path="/driver" exact component={DriverMap} />
            </Switch>
        </Router>
    )
}

export default App