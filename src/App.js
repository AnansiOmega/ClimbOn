import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { currentUser } from './Actions/auth'
import { useDispatch } from 'react-redux'
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

export const App = () => {
    const dispatch = useDispatch()
    return(
        <div className='root'>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/" component={LandingPage} />
            </Switch>
        </div>
    )
}