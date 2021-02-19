import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { thunkFetchRootUser } from '../Actions/user'
import { thunkFetchAuthCurrentUser } from '../Actions/auth'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import FeedSection from "./FeedSection";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const auth = useSelector(state => state.auth)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(thunkFetchAuthCurrentUser())
  },[])
  useEffect(() => {
    dispatch(thunkFetchRootUser(auth.id))
  }, [auth])
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const imgUrl = `http://localhost:3000/${user.photo}`
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax filter image={require("imgs/rock-climbing-pic.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12}>
              <h1>{user.username}</h1>
              <img src={imgUrl} alt="..." className={imageClasses}  id='landing-page-pic'/>
              <h4>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
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
