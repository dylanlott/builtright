import Vue from 'vue'
import VueRouter from 'vue-router'

import notfound from '../views/PageNotFound.vue'
import landing from '../views/Landing.vue'
import login from '../views/Login.vue'
import signup from '../views/SignUp.vue'
import dashboard from '../views/Dashboard.vue'
import builds from '../views/Builds.vue'
import editBuild from '../views/EditBuild.vue'
import addbuild from '../views/AddBuild.vue'
import parts from '../views/PartsList.vue'
import partDetails from '../views/PartDetails.vue'
import profile from '../views/UserProfile.vue'
import forgotpassword from '../views/ForgotPassword.vue'
import buildDetails from '../views/BuildDetails.vue'
import addPart from '../views/AddPart.vue'
import forum from '../views/Forum.vue'
import addPost from '../views/AddPost.vue'
import postDetail from '../views/PostDetail.vue'
import editPost from '../views/EditPost.vue'
import logout from '../views/Logout.vue'
import confirmation from '../views/EmailConfirmation.vue'
import info from '../views/AppInformation.vue'
import admin from '../views/AdminDashboard.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [{
    name: 'landing',
    path: '/',
    component: landing,
    meta: {
      auth: false
    }
  }, {
    name: 'login',
    path: '/login',
    component: login,
    meta: {
      auth: false
    }
  }, {
    name: 'signup',
    path: '/signup',
    component: signup,
    meta: {
      auth: false
    }
  }, {
    name: 'forgot',
    path: '/forgot',
    component: forgotpassword,
    meta: {
      auth: false
    }
  }, {
    name: 'profile',
    path: '/profile',
    component: profile,
    meta: {
      auth: true
    }
  }, {
    name: 'dashboard',
    path: '/dashboard',
    component: dashboard,
    meta: {
      auth: true
    }
  }, {
    path: '/builds',
    name: 'builds',
    component: builds,
    meta: {
      auth: true
    }
  }, {
    path: '/builds/create',
    name: 'addBuild',
    component: addbuild,
    meta: {
      auth: true
    }
  }, {
    path: '/builds/:id',
    name: 'buildDetails',
    component: buildDetails,
    meta: {
      auth: true
    }
  }, {
    path: '/builds/:id/add',
    name: 'addPart',
    component: addPart,
    meta: {
      auth: true
    }
  }, {
    path: '/builds/:id/edit',
    name: 'editBuild',
    component: editBuild,
    meta: {
      auth: true
    }
  }, {
    path: '/parts',
    component: parts,
    meta: {
      auth: false
    }
  },{
    path: '/parts/:id',
    name: 'partDetails',
    component: partDetails,
    meta: {
      auth: false
    }
  }, {
    path: '/posts',
    name: 'forum',
    component: forum,
    meta: {
      auth: false
    }
  }, {
    path: '/posts/add',
    name: 'addPost',
    component: addPost,
    meta: {
      auth: true
    }
  }, {
    path: '/posts/:id',
    name: 'postDetail',
    component: postDetail,
    meta: {
      auth: true
    }
  }, {
    path: '/posts/:id/edit',
    name: 'editPost',
    component: editPost,
    meta: {
      auth: true
    }
  }, {
    path: '/logout',
    name: 'logout',
    component: logout,
    meta: {
      auth: false
    }
  }, {
    path: '/confirm',
    name: 'confirmation',
    component: confirmation,
    meta: {
      auth: false
    }
  }, {
    path: '/info',
    name: 'info',
    component: info,
    meta: {
      auth: false
    }
  }, {
    path: '/admin',
    name: 'admin',
    component: admin,
    meta: {
      auth: true,
      admin: true
    }
  }, {
    path: '*',
    component: notfound
  }]
})
