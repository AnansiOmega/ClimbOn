import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux'
import PostCard from '../myComponents/PostCard'

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function FeedSection() {
  const classes = useStyles();
  const user = useSelector(state => state.user)
  const { user_and_friend_posts } = user

  const renderPosts = () => {
    return user_and_friend_posts?.map(post => <PostCard post={post} />)
  }
  return (
    <div className={classes.section}>
        <h2 className={classes.title}>What your friends have to say</h2>
      <div className='landing-page-user-posts'>
          {renderPosts()}
      </div>
    </div>
  );
}