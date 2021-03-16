import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { thunkAddLikeToPost } from '../Actions/post'
import clsx from 'clsx';
import { 
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  TextField
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from "components/CustomButtons/Button.js";
import { CommentCard } from './CommentCard'


const useStyles = makeStyles((theme) => ({
  root: {
    width: 'inherit',
    alignSelf: 'center'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',
  },
  expandOpen: {
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    gridRowStart: '1',
    gridColumnStart: '1'
  },
}));

export default function PostCard(props) {
  const classes = useStyles();
  const { content, id, user, likes, time_posted } = props["post"]
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  const rootUser = useSelector(state => state.user, shallowEqual)
  useEffect(() => {
    setLikeCount(likes.length)// due to the sorting that happens, the buttons don't remember whether they've been clicked or not
    setLiked(false)// therefore, I need to reset all of them to false even thought the state originally starts them at false
    likes.forEach( like => {
      if(like.user.id === rootUser.id) setLiked(true)
    })    // doesn't seem like components get
  },[likes])   // re-rendered, when they are sorted in higher up component.

  const handleShowComments = () => { // can't thunk this out because I need this information specifically for this component
    fetch(`http://localhost:3000/show-comments/${id}`) // can't hold all of the comments for every post in store 
    .then(resp => resp.json())
    .then(comments => {
      setComments(comments)
    })
    setExpanded(!expanded);
  };

  const handleSubmitNewComment = () => {// the same goes for this 
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post_id: id, content: newComment, user_id: rootUser.id})
    }

    fetch('http://localhost:3000/comments', reqObj)
    .then(resp => resp.json())
    .then(newComment => {
      setComments([...comments, newComment])
    })
    setNewComment('')
  }

  const renderComments = () => {
    return comments.map(comment => {
      return <CommentCard comment={comment} />
    })
  }

  const handleLikePost = () => {
    dispatch(thunkAddLikeToPost(id, rootUser.id))
    setLiked(true)
    setLikeCount(likeCount + 1)
  }

  const imgUrl = `http://localhost:3000/${user.photo}`
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar} src={imgUrl}/>
        }
        title={user.fname}
        subheader={time_posted}
      />
      <CardContent>
        <Typography variant="h5" color="textPrimary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={handleLikePost} disabled={liked}>
          <FavoriteIcon style={ liked ? {color: 'red'} : null } />
          {likeCount}
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleShowComments}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <h4>Comments</h4>
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {renderComments()}
          <TextField
          label="Comment"
          style={{ margin: 8, marginTop: '5%'}}
          placeholder="..."
          fullWidth
          margin="normal"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button onClick={handleSubmitNewComment} round color='primary'>Comment</Button>
        </CardContent>
      </Collapse>
    </Card>
  );
}