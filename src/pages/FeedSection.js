import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux'
import { fetchUserPostsSuccess } from '../Actions/post'
import PostCard from '../myComponents/PostCard'
import { useDispatch } from 'react-redux'

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function FeedSection() {
  const user = useSelector(state => state.user)
  const posts = useSelector(state => state.posts) 
  const dispatch = useDispatch()
  const classes = useStyles();
  useEffect(() => {
    fetch(`http://localhost:3000/user-and-friend-posts/${user.id}`)
    .then( resp => resp.json())
    .then( posts => {
      if(posts.error) return
      dispatch(fetchUserPostsSuccess(posts))
    })
  },[user])


  const renderPosts = () => {
    return posts.map(post => <PostCard post={post} />)
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