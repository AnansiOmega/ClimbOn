import React, { useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import classNames from "classnames";
import { thunkFetchFriendRequests } from '../Actions/user'
import { useDispatch, useSelector } from 'react-redux'
import FriendRequestCard from '../myComponents/FriendRequestCard'
const useStyles = makeStyles(styles);


export const FriendRequestPage = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const friendRequests = useSelector(state => state.otherUsers)
    useEffect(() => {
        document.body.style.backgroundColor = 'purple' // changes background color, because the white is blinding
        return () => {
            document.body.style.backgroundColor = 'white'
        }
    })

    useEffect(() => {
        const id = localStorage.getItem('userId')
        dispatch(thunkFetchFriendRequests(id))
    },[])
    
    const renderRequests = () => {
        return friendRequests?.map( user => <FriendRequestCard user={user}/>)
    }

    return(
        <div style={{marginTop: '15%'}}>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <div className={classes.section}>
                        <h2 style={{color: 'black'}} className={classes.title}>Current Friend Requests</h2>
                        {renderRequests()}
                    </div>
                </div>
            </div>
        </div>
    )
}
