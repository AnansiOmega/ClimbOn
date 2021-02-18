import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { currentUser } from './Actions/auth'
import { useDispatch } from 'react-redux'
import LandingPage from "views/LandingPage/LandingPage.js";
// import Components from "views/Components/Components.js";
// import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

export const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const token = localStorage.getItem('myToken')
        const reqObj = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
        fetch('http://localhost:3000/current_user', reqObj)
        .then(resp => resp.json())
        .then(user => dispatch(currentUser(user)))
      },[])
    return(
        <div className='root'>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/" component={LandingPage} />
                {/* <Route path="/profile-page" component={ProfilePage} /> */}
                {/* <Route path="/" component={Components} /> */}
            </Switch>
        </div>
    )
}