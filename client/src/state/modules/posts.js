import * as types from '../mutation-types'
import posts from '../../api/posts'
import { router } from '../../router/index'

const storage = window.localStorage
const user = storage.getItem('user_id')
const token = storage.getItem('token')

const state = {
  posts: [],
  postDetails: undefined,
  success: false,
  loading: false,
  owner: false, //whether or not user is owner of post
  errors: ''
}

const mutations = {
  [types.GET_POSTS_REQUEST] (state) {
    state.loading = true
    state.success = false
    state.posts = []
  },
  [types.GET_POSTS_SUCCESS] (state, posts) {
    state.posts = posts
    state.loading = false
    state.success = true
  },
  [types.GET_POSTS_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  },
  [types.CREATE_POST_REQUEST] (state) {
    state.loading = true
    state.success = false
  },
  [types.CREATE_POST_SUCCESS] (state) {
    state.loading = false
    state.success = true
  },
  [types.CREATE_POST_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  },
  [types.GET_POST_DETAILS_REQUEST] (state) {
    state.loading = true
    state.success = false
    state.postDetails = {}
    state.errors = ''
  },
  [types.GET_POST_DETAILS_SUCCESS] (state, data) {
    state.loading = false
    state.success = true
    state.postDetails = data
    state.errors = undefined
  },
  [types.GET_POST_DETAILS_FAILURE] (state, errors) {
    state.loading = false
    state.success = false
    state.errors = errors
  }
}

const actions = {
  getPosts ({commit, state}, options) {
    commit(types.GET_POSTS_REQUEST)
    return posts.getPosts(options)
      .then((res) => {
        const posts = res.data
        commit(types.GET_POSTS_SUCCESS, posts)
        return posts
      })
      .catch((err) => {
        console.log(`Error getting posts: ${err}`)
        commit(types.GET_POSTS_FAILURE, err)
        return err
      })
  },

  getPostDetails ({commit, state}, id) {
    commit(types.GET_POST_DETAILS_REQUEST)
    return posts.getDetails(id)
      .then((post) => {
        commit(types.GET_POST_DETAILS_SUCCESS, post)
      })
      .catch((err) => {
        commit(types.GET_POST_DETAILS_FAILURE, err)
      })
  },

  createPost ({commit, state}, post) {
    commit(types.CREATE_POST_REQUEST)
    return posts.createPost(post)
      .then((res) => {
        commit(types.CREATE_POST_SUCCESS)
        router.push({ name: 'forum' })
        return res
      })
      .catch((err) => {
        console.log(`Error creating post ${err}`)
        commit(types.CREATE_POST_FAILURE)
        return err
      })
  },

  updatePost ({commit, state}, previous, updated) {
    return null
  },

  deletePost ({commit, state}, id) {
    commit(types.DELETE_POST_REQUEST)
    return posts.deletePost(id)
      .then((res) => res.data)
      .catch((err) => err)
  }
}

const getters = {
  approvedPosts: state => {
    return state.posts.filter((post) => !post.flagged)
  },
  flaggedPosts: state => {
    return state.posts.filter((post) => post.flagged)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
