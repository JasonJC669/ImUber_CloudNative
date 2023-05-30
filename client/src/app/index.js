import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { DriverLogin, PassengerLogin, Driver_road, Links } from '../pages'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <Links />
            <Switch>
                <Route path="/UBER/DRIVER" exact component={DriverLogin} />
                <Route path="/UBER/DRIVER/DRIVERROAD" exact component={Driver_road} />
                <Route path="/UBER/PASSENGER" exact component={PassengerLogin} />
            </Switch>
        </Router>
    )
}

export default App