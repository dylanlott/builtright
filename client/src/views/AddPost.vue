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
            <v-container>
              <v-form>
                <v-text-field
                  id="postTitle"
                  name="postTitle"
                  label="Post Title"
                  v-model="post.title"
                ></v-text-field>
                <v-text-field
                 name="postBody"
                 label="Body"
                 v-model="post.body"
                 multi-line
                ></v-text-field>
                <v-layout column>
                  <div class="grey--text darken-1 left-align">Tags (separate with commas)</div>
                  <input-tag :tags.sync="post.tags"></input-tag>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat class="primary--text" @click.native="goToForum()">Cancel</v-btn>
            <v-btn flat v-on:click.native="submit()" class="primary--text">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import marked from 'marked'
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
        body: '',
        tags: []
      },
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
      this.post.type = 'forum'
      this.$store.dispatch('createPost', this.post)
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
