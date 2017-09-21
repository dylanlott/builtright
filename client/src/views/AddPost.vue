<template lang="html">
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card class="addpart__card">
          <v-card-text>
            <h1>Add a post to the forums</h1>
          </v-card-text>
          <v-card-text class="subheading grey--text">
            Post a question, a discussion topic, whatever is on your mind, share it!
          </v-card-text>
          <div class="addpart__form">
            <form>
              <v-card-row>
                <v-text-field
                  id="postTitle"
                  name="postTitle"
                  label="Post Title"
                  v-model="post.title"
                  class="form__title"
                ></v-text-field>
              </v-card-row>
              <v-card-row>
                <v-text-field
                 name="postText"
                 label="Body"
                 v-model="post.text"
                 multi-line
                ></v-text-field>
              </v-card-row>
            </form>
          </div>
          <v-card-row actions>
            <v-btn flat class="primary--text" @click.native="goToForum()">Cancel</v-btn>
            <v-btn flat v-on:click.native="submit()" class="primary--text">Submit</v-btn>
          </v-card-row>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { router } from '../router/index'
import { mapState, mapDispatch } from 'vuex'
const moment = require('moment')

export default {
  name: 'AddPost',
  data () {
    return {
      modal: false,
      post: {
        title: '',
        body: ''
      }
    }
  },
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    goToForum () {
      router.push({ name: 'forum' })
    },
    submit () {
      this.post.date = moment().format('YYYY-MM-DD HH:m:s')
      this.post.user = this.user.user_id
      this.post.type = 'forum'
      this.post.published = true
      console.log('post: ', this.post)
      this.$store.dispatch('createPost', this.post)
      //fire off toast
    }
  }
}
</script>

<style lang="stylus">
@import '../css/theme.styl'

form
  font-size: 16px

.addpart__form
  width: 80%
  margin: 0 auto

.form-textarea
  border-color: charcoal
  margin: 40px auto

.form-textarea
  outline: charcoal
  border:1px solid charcoal
  padding: 8px

.form-textarea:focus
  outline: charcoal
  border: 2px solid charcoal

.form__title
  width: 80%
  margin: 0 auto
</style>
