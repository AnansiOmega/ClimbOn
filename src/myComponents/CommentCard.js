import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    avatar: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      gridRowStart: '1',
      gridColumnStart: '1'
    },
  }));


export const CommentCard = (props) => {
    const classes = useStyles();
    const { user, content, likes, id, time_posted } = props['comment']
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(likes.length)
    const rootUserId = parseInt(localStorage.getItem('userId'))
    useEffect(() => {
        likes.forEach(like => {
            if (like.user.id === rootUserId) {
                setLiked(true)
            }
        })
    })

    const handleLikeComment = () => {
        const reqObj = {
            method: 'POST',
            headers: { 
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ comment_id: id, user_id: rootUserId })
        }
        fetch('http://localhost:3000/likes', reqObj)
        setLiked(true)
        setLikeCount(likeCount + 1)
    }


    const commentImgUrl = `http://localhost:3000/${user.photo}`

    return (
        <div className='comment-card'>
            <div style={{ gridColumnStart: '2', justifySelf: 'start' }}><span>{user.fname}</span><span style={{float: 'right'}}>{time_posted}</span></div>
            <Avatar className={classes.avatar} src={commentImgUrl} />
            <IconButton onClick={handleLikeComment} aria-label="like comment" style={{ gridColumnStart: '1', gridRowStart: '2' }} disabled={liked}>
                <FavoriteIcon style={liked ? { color: 'red' } : null} />
                {likeCount}
            </IconButton>
            <Typography paragraph>{content}</Typography>
        </div>
    )
}