import C from './types'
import { Post } from '../utils/interfaces'

export const requestPosts = () => {
  return {
    type: C.REQUESTED_POSTS
  }
}

export const requestAddPost = () => {
  return {
    type: C.REQUESTED_ADD_POST
  }
}

export const requestEditPost = () => {
  return {
    type: C.REQUESTED_EDIT_POST
  }
}

export const requestDeletePosts = () => {
  return {
    type: C.REQUESTED_DELETE_POSTS
  }
}

export const requestSuccess = (posts: Post[]) => {
  return {
    type: C.REQUESTED_SUCCEEDED,
    payload: posts
  }
}

export const requestError = () => {
  return {
    type: C.REQUESTED_FAILED
  }
}

export const fetchPosts = () => {
  return {
    type: C.FETCHED_POSTS
  }
}

export const addPost = (post: Post) => {
  return {
    type: C.ADD_POST,
    payload: post
  }
}

export const editPost = (post: Post) => {
  return {
    type: C.EDIT_POST,
    payload: post
  }
}

export const deletePosts = (ids: string[]) => {
  return {
    type: C.DELETE_POSTS,
    payload: ids
  }
}