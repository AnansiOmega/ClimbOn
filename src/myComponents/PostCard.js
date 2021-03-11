import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { thunkFetchComments, thunkSubmitNewComment, thunkAddLikeToPost } from '../Actions/post'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import Button from "components/CustomButtons/Button.js";
import { CommentCard } from './CommentCard'
import { setSyntheticLeadingComments } from 'typescript';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '75vw',
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
  const [likeCount, setLikeCount] = useState(likes.length)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const dispatch = useDispatch()
  const rootUser = useSelector(state => state.user)
  useEffect(() => {
    likes.forEach( like => {
      if(like.user.id === rootUser.id){
        setLiked(true)
      }
    })
  })

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