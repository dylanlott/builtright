<template lang="html">
  <v-layout>
    <v-flex>
      <v-container>
        <v-card transition="slide-y-transition">
          <v-card-title>Edit Post - {{details.title}}</v-card-title>
          <v-card-text>
            <v-text-field
              name="tags"
              label="Tags"
              v-model="initial.tags"
            ></v-text-field>
              <v-text-field
              name="text"
              label="Text"
              v-model="initial.body"
              multi-line
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn primary @click="submitUpdate()">Submit</v-btn>
            <v-spacer></v-spacer>
            <v-btn error @click="deletePost()">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked' 

export default {
  name: 'editPost',
  data () {
    return {
      updated: {
        text: '',
        tags: ''
      },
      initial: {}
    }
  },
  computed: mapState({
    user: state => state.user,
    details: state => state.posts.postDetails
  }),
  created () {
    this.$store.dispatch('getPostDetails', this.$route.params.id)
      .then(() => {
        this.initial = this.details
        Object.assign(this.initial, this.details)
      })
  },
  methods: {
    formatted (data) {
      return marked(data, { sanitize: true })
    },
    submitUpdate () {
      console.log('initial: ', this.initial)
      this.$store.dispatch('updatePost', this.initial)
    },
    deletePost () {
      this.$swal({
        title: 'Confirm delete',
        text: 'Are you sure you want to delete this post?',
        icon: 'warning'
      })
      .then((deleted) => {
        this.$dispatch('deletePost', this.$route.params.id)
        this.$swal('Post deleted.', '', success)
      })
    }
  }
}
</script>

<style lang="stylus">
.text-left
  text-align: left
.title
  font-size: 1.4rem
  margin: 15px 15px 0px 15px 
</style>
