////////////////// POSTS ///////////////////////////

export const fetchUserPostsSuccess = payload => {
    return {
        type: 'FETCH_USER_POSTS_SUCCESS',
        payload
    }
}

export const createNewPostSuccess = payload => {
    return {
        type: 'CREATE_NEW_POST_SUCCESS',
        payload
    }
}






/////////////// POST THUNKS ////////////////////////////



export const thunkAddLikeToPost = (post_id, user_id) => {
    return (dispatch) => {
        const reqObj = {
            method: 'POST',
            headers: { 
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ post_id, user_id })
      
          }
          fetch('http://localhost:3000/likes', reqObj)
    }
}

export const thunkCreatePost = (content) => {
    return (dispatch) => {
      const user_id = localStorage.getItem('userId')
      const reqObj = {
          method: 'POST', 
          headers: {
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify({ user_id, content })
      }
      fetch('http://localhost:3000/posts', reqObj)
      .then(resp => resp.json())
      .then( newPost => {
        dispatch(createNewPostSuccess(newPost))
      })
    }
}
















//////////////// COMMENTS /////////////////////////////
export const postCommentsFetchSuccess = payload => {
    return {
        type: 'POST_COMMENTS_FETCH_SUCCESS',
        payload
    }
}

export const createNewCommentSuccess = payload => {
    return {
        type: 'CREATE_NEW_COMMENT_SUCCESS',
        payload
    }
}




//////// thunks 
export const thunkAddLikeComment = (comment_id, user_id) => {
    return(dispatch) => {
        const reqObj = {
            method: 'POST',
            headers: { 
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify({ comment_id, user_id })
        }
        fetch('http://localhost:3000/likes', reqObj)
    }
}

export const thunkSubmitNewComment = (post_id, content, user_id) => {
    return (dispatch) => {
        const reqObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ post_id, content, user_id})
          }
      
          fetch('http://localhost:3000/comments', reqObj)
          .then(resp => resp.json())
          .then(newComment => {
            dispatch(createNewCommentSuccess(newComment))
          })
    }
}

export const thunkFetchComments = (id) => {
return (dispatch) => {
        fetch(`http://localhost:3000/show-comments/${id}`)
            .then(resp => resp.json())
            .then(comments => {
                dispatch(postCommentsFetchSuccess(comments))
            })
    }
}