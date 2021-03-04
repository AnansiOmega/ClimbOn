/*eslint-disable*/
import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../Actions/auth'
import { useHistory } from 'react-router-dom'
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps } from "@material-ui/icons";
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  console.log(props)
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector(state => state.user)
  

  const handleLogout = () => {
    dispatch(logoutUser)
    localStorage.removeItem('myToken')
    history.push('/login')
  }
  
  const classes = useStyles();
  const profilePageUrl = `/profile/${user.id}`
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link
          to='/find'
          color="transparent"
          className={classes.navLink}
        >
          Find Climbers
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
           <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          user={user}
          buttonText="Notifications"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={ NotificationsActiveIcon }
          dropdownList={[
            <Link className={classes.dropdownLink}>
              OtherStuff
            </Link>,
            <Link
            to='/friend-requests'
            color="transparent"
            className={classes.navLink}
          >
          <i className="material-icons">person_add</i>
          </Link>
          ]}
        />
      </ListItem>
          <Link
            to={profilePageUrl}
            color="transparent"
            className={classes.navLink}
          >
            Profile
          </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
          <Button
            onClick={handleLogout}
            color="transparent"
            className={classes.navLink}
          >
          Logout
          </Button>
      </ListItem>
    </List>
  );
}
