import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { thunkFetchUser } from '../Actions/user'

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/landingPage.js";
// Sections for this page
import FeedSection from "./FeedSection";
import CreatePostSection from '../myComponents/CreatePostSection'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { setGlobalCssModule } from "reactstrap/es/utils";

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const auth = useSelector(state => state.auth, shallowEqual)
  const user = useSelector(state => state.user, shallowEqual)
  const [picAnimation, setPicAnimation] = useState('hidden-profile-pic')
  useEffect(() => {
    setTimeout(() => setPicAnimation('profile-pic'), 1000)
  }, [])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunkFetchUser(auth.id))
  },[auth])

  const loader = useSelector(state => state.loader, shallowEqual)

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  
  const { id, fname, lname, climbing_preference, commitment, photo, friends } = user

  const renderFriends = () => {
    if(!friends) return 
    return friends.map( person => {
      const imgUrl = `http://localhost:3000/${person.photo}`    
      return <div className={picAnimation}><img src={imgUrl} alt="profile picture" className={imageClasses}  id='friends-landing-page-pic'/></div>
    }) 
  }

  const imgUrl = `http://localhost:3000/${photo}`
  const profileUrl = `/profile/${id}`
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loader}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Parallax filter image={require("imgs/rock-climbing-pic.jpg")}>
        <section className='user-page-people'>
          {renderFriends()}
          <div className={picAnimation}>
            <Link to={profileUrl} className='home-page-link'>
              <img src={imgUrl} alt="profile picture" className={imageClasses} id='landing-page-pic'/>
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
      <Footer />
    </div>
  );
}
