import React, { useEffect, useState } from 'react'
import { Switch, Route, useLocation, useHistory } from 'react-router-dom'
import { thunkFetchAuthCurrentUser } from './Actions/auth'
import { thunkFetchUser } from './Actions/user'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import LandingPage from './pages/LandingPage';
import { FindClimbers } from './pages/FindClimbers'
import ProfilePage from './pages/ProfilePage'
import { SettingsPage } from './pages/SettingsPage'
import { FriendRequestPage } from './pages/FriendRequestPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Header from './myComponents/Header'
import HeaderLinks from './myComponents/HeaderLinks'
import { MessageBar } from './myComponents/MessageBar'

export const App = () => {
    const [hideBars, setHideBars] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    const history = useHistory()
    const auth = useSelector(state => state.auth, shallowEqual)

    useEffect(() => {
        const token = localStorage.getItem('myToken')
        token ? dispatch(thunkFetchAuthCurrentUser(token)) : history.push('/login')
    },[])

    useEffect(() => {
        if(!auth.id) return
        dispatch(thunkFetchUser(auth.id))
    },[auth])

    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/signup') {
            setHideBars(true)
        } else {
            setHideBars(false)
        }
    }, [location.pathname])
    

    const dashboardRoutes = [];
    return(
        <div className='root'>
            { hideBars ?
             null
              :
               <Header
                color="transparent"
                routes={dashboardRoutes}
                brand="Climb on"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 400,
                    color: "white"
                }}
            />
            }
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
                <Route path="/find" component={FindClimbers} />
                <Route path="/profile/settings" component={SettingsPage} />
                <Route path="/profile/:id" component={ProfilePage} />
                <Route path="/friend-requests" component={FriendRequestPage} />
                <Route exact path="/" component={LandingPage} />
            </Switch>
            { hideBars ? null : <MessageBar/> }
        </div>
    )
}