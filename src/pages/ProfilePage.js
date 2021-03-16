import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { thunkFetchUser } from '../Actions/user'
import { thunkFetchUsersPosts } from '../Actions/post'
import { useParams } from 'react-router-dom'
import PostCard from '../myComponents/PostCard'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FriendMessageCard from '../myComponents/FriendMessageCard'
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const dispatch = useDispatch()
  const params = useParams()

  useEffect(() => { // when profile page mounts will send fetch request for the user at the params
    dispatch(thunkFetchUser(params["id"]))
    dispatch(thunkFetchUsersPosts(params["id"]))
  },[params["id"]])
  
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
    );

    const user = useSelector(state => state.user)
    const posts = useSelector(state => state.posts)
    const { username, fname, lname, photo, climbing_preference, skill_level, bio, friends, background_image } = user
    const imgUrl = `http://localhost:3000/${photo}`
    const backgroundImageUrl = `http://localhost:3000/${background_image}`

    const renderConversations = () => { // might remove this later since I've decided to render all friends on drawer instead
      if(!friends) return
      return friends.map( user => {
        return <FriendMessageCard user={user}/>
      })
    }

    const renderUsersPosts = () => {
      return posts.map(post => <PostCard post={post}/>)
    }
  
    
  return (
    <div>
      <Parallax small filter image={background_image ? backgroundImageUrl : require("imgs/rock-climbing-pic.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={imgUrl} alt="profile-picture" className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h1 className={classes.title}>{`${fname} ${lname}`}</h1>
                    <h3>{`(${username})`}</h3>
                    <h2>{`Climbing ${climbing_preference} at a ${skill_level} level`}</h2>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                {bio}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Posts",
                      tabIcon: Camera,
                      tabContent: (
                        <div>
                          {renderUsersPosts()}
                        </div>
                      )
                    },
                    // {
                    //   tabButton: "Pics",
                    //   tabIcon: Palette,
                    //   tabContent: (
                    //     <GridContainer justify="center">
                    //       <GridItem xs={12} sm={12} md={4}>
                    //         <img
                    //           alt="..."
                    //           src={work1}
                    //           className={navImageClasses}
                    //         />
                    //         <img
                    //           alt="..."
                    //           src={work2}
                    //           className={navImageClasses}
                    //         />
                    //         <img
                    //           alt="..."
                    //           src={work3}
                    //           className={navImageClasses}
                    //         />
                    //       </GridItem>
                    //       <GridItem xs={12} sm={12} md={4}>
                    //         <img
                    //           alt="..."
                    //           src={work4}
                    //           className={navImageClasses}
                    //         />
                    //         <img
                    //           alt="..."
                    //           src={work5}
                    //           className={navImageClasses}
                    //         />
                    //       </GridItem>
                    //     </GridContainer>
                    //   )
                    // },
                    {
                      tabButton: "Partners",
                      tabIcon: Favorite,
                      tabContent: (
                        <div className='profile-page-friend-container'>
                          {renderConversations()}
                        </div>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
