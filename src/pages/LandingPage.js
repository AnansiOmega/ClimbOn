import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { thunkFetchRootUser } from '../Actions/user'
import { thunkFetchAuthCurrentUser } from '../Actions/auth'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
// import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import FeedSection from "./FeedSection";

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const auth = useSelector(state => state.auth, shallowEqual)
  const user = useSelector(state => state.user, shallowEqual)
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    const token = localStorage.getItem('myToken')
    token ? dispatch(thunkFetchAuthCurrentUser(token)) : history.push('/login')
  },[])

  useEffect(() => {
    dispatch(thunkFetchRootUser(auth.id))
  },[auth])

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
   const { id, username, fname, lname, age, gender, climbing_preference, commitment, skill_level, bio, street, city, state, photo, password } = user
  const imgUrl = `http://localhost:3000/${photo}`
  return (
    <div>
      <Parallax filter image={require("imgs/rock-climbing-pic.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12}>
              <h1>{username}</h1>
              <img src={imgUrl} alt="..." className={imageClasses}  id='landing-page-pic'/>
              <h4>
                {`${fname} ${lname}`}
              </h4>
              <h4>
                 {`Climbing ${climbing_preference} ${commitment} ${commitment === 1 ? 'day' : 'days' } a week`}
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <FeedSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
