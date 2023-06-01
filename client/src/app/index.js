import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Links, PassengerMap } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Links} />
                <Route path="/passenger" exact component={PassengerMap} />
            </Switch>
        </Router>
    )
}

export default App