import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { shallowEqual, useSelector } from 'react-redux'
import { thunkFetchUsersAndFriendsPosts } from '../Actions/post'
import PostCard from '../myComponents/PostCard'
import { useDispatch } from 'react-redux'
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function FeedSection() {
  const user = useSelector(state => state.user)
  const posts = useSelector(state => state.posts, shallowEqual)
  const [sortBy, setSortBy] = useState('Most Recent')
  const dispatch = useDispatch()
  const classes = useStyles();
  useEffect(() => {
    if(!user.id) return
    dispatch(thunkFetchUsersAndFriendsPosts(user.id))
  },[user])



  const renderPosts = () => {
    let sortedPosts;
    switch(sortBy){
      case 'Most Recent':
        sortedPosts = posts.sort((a, b) => a.id < b.id ? 1 : -1 )
        break;
      case 'Oldest':
        sortedPosts = posts.sort((a, b) => a.id < b.id ? -1 : 1 )
        break;
      case 'Most Liked':
        sortedPosts = posts.sort((a, b) => {
          if(a.likes.length < b.likes.length) return 1
          if(a.likes.length > b.likes.length) return -1
          return 0
        })
        break;
    }
    return sortedPosts.map(post => <PostCard post={post} />)
  }
  return (
    <div className={classes.section}>
        <h2 className={classes.title}>What your friends have to say</h2>
        <FormControl className={classes.formControl}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <MenuItem value='Most Recent'>Most Recent</MenuItem>
          <MenuItem value='Oldest'>Oldest</MenuItem>
          <MenuItem value='Most Liked'>Most Liked</MenuItem>
        </Select>
      </FormControl>

      <div className='landing-page-user-posts'>
          {renderPosts()}
      </div>
    </div>
  );
}