import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { thunkCreatePost } from '../Actions/post'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import { title } from "../assets/jss/material-kit-react.js";
import { StepContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '60vw'
    },
},
    title: {
        ...title,
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        textDecoration: "none"
    },
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleCreatePost = () => {
      dispatch(thunkCreatePost(content))
      setContent('')
  }

  return (
      <div>
          <h1 className={classes.title}>Create a post</h1>
          <form className={classes.root} noValidate autoComplete="off" style={{ marginBottom: '0'}}>
              <TextField
                  label="Got something to say punk?"
                  multiline
                  rows={4}
                  variant="outlined"
                  value={content}
                  onChange={e => setContent(e.target.value)}
              />
          </form>
        <Button onClick={handleCreatePost} style={{ width: '60vw', marginTop: '0' }} color='primary'>Post</Button>
      </div>
  );
}