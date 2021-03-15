import React, { useState, useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import MessageModal from './MessageModal'
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  });

  
export const MessageBar = () => {
    const [unreadMessages, setUnreadMessages] = useState([])
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false)
    const user = useSelector(state => state.user, shallowEqual)
    const { notifications, friends } = user
    useEffect(() => {
      if(!user.id) return  /// filters out messages to only show the new messages, to update whether there should be new message button
      let newNotifications = notifications?.filter( notification => notification.notice_type === 'newMessage')
        let messages = newNotifications.map( notification => {
          return friends.find(friend => friend.id === notification.notice_id)
        })
        setUnreadMessages(Array.from(new Set(messages)))// doesn't matter how many messages from the same person, just have a bubble
    },[user, notifications?.length])


    const renderContacts = () => {
      return friends?.map(friend => <MessageModal user={friend} />)
    }


    
      const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={() => setDrawerOpen(true)}
        >
          <div className='message-contacts-container'>
            {renderContacts()}
          </div>
        </div>
      );
    


    const renderUnreadMessages = () => {
      return unreadMessages.map( user => <MessageModal user={user} type='MessageBar'/>)
    }

    return(
      <BottomNavigation showLabels className={classes.root}>
         <div>
        <React.Fragment key='left'>
          <Button onClick={() => setDrawerOpen(true)}>Send a Message</Button>
          <SwipeableDrawer
            anchor='left'
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
    </div>
        {renderUnreadMessages()}
      </BottomNavigation>
    )
}