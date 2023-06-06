import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Links, PassengerMap, DriverMap, DriverGroup, PassengerGroup } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Links} />
                <Route path="/passenger" exact component={PassengerMap} />
                <Route path="/passenger/group" exact component={PassengerGroup} />
                <Route path="/driver" exact component={DriverMap} />
                <Route path="/driver/group" exact component={DriverGroup} />
            </Switch>
        </Router>
    )
}

export default App