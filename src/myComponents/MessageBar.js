import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import MessageModal from './MessageModal'

const useStyles = makeStyles({
    root: {
        display: "flex",
        border: "0",
        borderRadius: "3px",
        padding: "0.625rem 0",
        color: "#555",
        width: "100%",
        backgroundColor: "#fff",
        boxShadow:
            "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
        transition: "all 150ms ease 0s",
        alignItems: "center",
        flexFlow: "row nowrap",
        justifyContent: "flex-start",
        position: "relative",
        zIndex: "1100",
        position: 'sticky',
        bottom: '0'
    },
  });

  
export const MessageBar = () => {
    const [unreadMessages, setUnreadMessages] = useState([])
    const classes = useStyles();
    const user = useSelector(state => state.user)
    useEffect(() => {
      if(!user.id) return  /// filters out messages to only show the new messages, to update whether there should be new message button
        let notifications = user.notifications?.filter( notification => notification.notice_type === 'newMessage')
        let messages = notifications.map( notification => {
          return user.friends.find(friend => friend.id === notification.notice_id)
        })
        setUnreadMessages(Array.from(new Set(messages)))// doesn't matter how many messages from the same person, just have a bubble
    },[user])

    const renderUnreadMessages = () => {
      return unreadMessages.map( user => <MessageModal user={user} type='MessageBar'/>)
    }

    return(
      <BottomNavigation showLabels className={classes.root}>
        <div style={{marginRight: '1rem'}}>New messages from:</div>
        {renderUnreadMessages()}
      </BottomNavigation>
    )
}