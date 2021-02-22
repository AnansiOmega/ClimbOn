import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { currentUser } from './Actions/auth'
import { useDispatch } from 'react-redux'
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Header from './myComponents/Header'
import HeaderLinks from './myComponents/HeaderLinks'

export const App = () => {
    const dashboardRoutes = [];
    const dispatch = useDispatch()
    return(
        <div className='root'>
            <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="Material Kit React"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
            />
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/" component={LandingPage} />
            </Switch>
        </div>
    )
}