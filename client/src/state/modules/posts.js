import * as types from '../mutation-types'
import posts from '../../api/posts'
import { router } from '../../router/index'
import api from '../../api'

const client = api()
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
  },
  [types.UPDATE_POST_REQUEST] (state) {
    state.loading = true
    state.success = false
  },
  [types.UPDATE_POST_SUCCESS] (state, post) {
    state.loading = false
    state.success = true
    state.postDetails = post
  },
  [types.UPDATE_POST_FAILURE] (state, err) {
    state.loading = false
    state.success = false
    state.errors = err
  },
  [types.UPVOTE_POST_SUCCESS] (state, post) {
    state.postDetails = post
  },
  [types.UPVOTE_POST_FAILURE] (state, err) {
    state.errors = err.message
  },
  [types.DOWNVOTE_POST_SUCCESS] (state, post) {
    state.postDetails = post
  },
  [types.DOWNVOTE_POST_FAILURE] (state, err) {
    state.errors = err.message
  }
}

const actions = {
  getPosts ({commit, state}, options) {
    commit(types.GET_POSTS_REQUEST)
    return posts.getPosts(options)
      .then((posts) => {
        console.log('get posts: ', posts);
        commit(types.GET_POSTS_SUCCESS, posts)
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

  updatePost ({commit, state}, updated) {
    return client.request('PUT', `/api/posts/${updated.id}`, updated)
      .then((res) => {
        console.log('update post response: ', res)
        commit(types.UPDATE_POST_SUCCESS, res.data)
      })
      .catch((err) => commit(types.UPDATE_POST_FAILURE, err))
  },

  deletePost ({commit, state}, id) {
    commit(types.DELETE_POST_REQUEST)
    return posts.deletePost(id)
      .then((res) => res.data)
      .catch((err) => err)
  },

  comment ({commit, state}, id, comment) {
    commit(types.ADD_COMMENT_REQUEST)
    return posts.comment(id, comment)
      .then((res) => commit(types.ADD_COMMENT_SUCCESS))
      .catch((err) => commit(types.ADD_COMMENT_FAILURE, err))
  },

  upvotePost ({ commit }, id) {
    return client.post(`/api/posts/${id}/upvote`)
      .then((res) => commit(types.UPVOTE_POST_SUCCESS, res.data))
      .catch((err) => commit(types.UPVOTE_POST_FAILURE, err))
  },

  downvotePost ({ commit }, id) {
    return client.post(`/api/posts/${id}/downvote`)
      .then((res) => commit(types.UPVOTE_POST_SUCCESS, res.data))
      .catch((err) => commit(types.UPVOTE_POST_FAILURE, err))
  }
}

const getters = {
  approvedPosts: state => {
    return state.posts.filter((post) => !post.flagged)
  },
  flaggedPosts: state => {
    return state.posts.filter((post) => post.flagged)
  },
  upvotes: state => {
    if (!!state._upvotes) {
      return state._upvotes.length
    }
    return 0
  },
  downvotes: state => {
    if (!!state._downvotes) {
      return state._downvotes.length
    }
    return 0
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
