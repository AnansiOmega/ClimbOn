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