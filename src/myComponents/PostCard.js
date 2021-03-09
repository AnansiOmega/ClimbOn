import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
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
    height: theme.spacing(7)
  },
}));

export default function PostCard(props) {
  const classes = useStyles();
  const {user_id, content, id } = props["post"]
  const [expanded, setExpanded] = React.useState(false);
  const [poster, setPoster] = useState({})
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const user = useSelector(state => state.user)
  useEffect(() => { // finds the friend associated with the post, so I can use their info to flourish the card
    if(!user.friends) return
    let friend = user.friends.find(friend => friend.id === user_id)
    console.log(friend)
    friend ? setPoster(friend) : setPoster(user)
  },[user])


  const handleShowComments = () => {
    fetch(`http://localhost:3000/posts/${id}`)
    .then(resp => resp.json())
    .then(post => {
      setComments(post.comments)
    })
    setExpanded(!expanded);
  };

  const handleSubmitNewComment = () => {
    const user_id = localStorage.getItem('userId')
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post_id: id, content: newComment, user_id})
    }

    fetch('http://localhost:3000/comments', reqObj)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
    })
    setNewComment('')
  }

  const renderComments = () => {
    return comments.map( comment => {
      const commentImgUrl = `http://localhost:3000/${comment.user.photo}`
    return <div className='comment-card'>
      <Avatar className={classes.avatar} src={commentImgUrl}/>
      <Typography paragraph>{comment.content}</Typography>
      </div>
  })
  }

  const imgUrl = `http://localhost:3000/${poster.photo}`
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar} src={imgUrl}/>
        }
        title={poster.fname}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
          style={{ margin: 8 }}
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