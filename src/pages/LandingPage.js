import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import { useSelector, shallowEqual } from 'react-redux'
import { thunkFetchUser } from '../Actions/user'
import { useDispatch } from 'react-redux'
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
import FeedSection from "./FeedSection";
import CreatePostSection from '../myComponents/CreatePostSection'
import { Backdrop, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const user = useSelector(state => state.user, shallowEqual)
  const dispatch = useDispatch()
  const history = useHistory()
  const [picAnimation, setPicAnimation] = useState('hidden-profile-pic')
  useEffect(() => {
    setTimeout(() => setPicAnimation('profile-pic'), 500)
  }, [])

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    dispatch(thunkFetchUser(userId))
  },[])



  const loader = useSelector(state => state.loader, shallowEqual)

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  
  const { id, fname, lname, climbing_preference, commitment, photo, friends, background_image } = user

  const renderFriends = () => {
    if(!friends) return 
    return friends.map( person => {
      const imgUrl = `http://localhost:3000/${person.photo}`    
      return <div onClick={() => history.push(`/profile/${person.id}`)} className={picAnimation}><img src={imgUrl} alt="profile" className={imageClasses}  id='friends-landing-page-pic'/></div>
    }) 
  }

  const profileImageUrl = `http://localhost:3000/${photo}`
  const backgroundImageUrl = `http://localhost:3000${background_image}`
  const profileUrl = `/profile/${id}`
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Parallax filter image={background_image ? backgroundImageUrl : require("imgs/rock-climbing-pic.jpg")}>
        <section className='user-page-people'>
          {renderFriends()}
          <div className={picAnimation}>
            <Link to={profileUrl} className='home-page-link'>
              <img src={profileImageUrl} alt="profile" className={imageClasses} id='landing-page-pic'/>
              </Link>
              <h4>
                {`${fname} ${lname}`}
              </h4>
              <h4>
                 {`Climbing ${climbing_preference} ${commitment} ${commitment === 1 ? 'day' : 'days' } a week`}
              </h4>
          </div>
        </section>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <CreatePostSection />
          <FeedSection />
        </div>
      </div>
    </div>
  );
}
