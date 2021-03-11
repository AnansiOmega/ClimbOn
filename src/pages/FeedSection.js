import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux'
import { fetchUserPostsSuccess } from '../Actions/post'
import PostCard from '../myComponents/PostCard'
import { useDispatch } from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function FeedSection() {
  const user = useSelector(state => state.user)
  const posts = useSelector(state => state.posts)
  const [sortBy, setSortBy] = useState('Most Recent')
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
  useEffect(() => {
    
  }, [sortBy])



  const renderPosts = () => {
    return posts.map(post => <PostCard post={post} />)
  }
  return (
    <div className={classes.section}>
        <h2 className={classes.title}>What your friends have to say</h2>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-autowidth-label">Sort By</InputLabel>
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