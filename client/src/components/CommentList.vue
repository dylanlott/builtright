<template lang="html">
  <v-card class="pa-0 mb-4">
    <v-card-title class="display-1">Comments</v-card-title>
    <v-card-text v-if="comments && comments.length === 0">
      There are no comments to display at this time.
    </v-card-text>
    <v-list two-line class="comment-list">
      <v-list class="comment-list" :key="comment._id" v-for="(comment, index) in comments">
        <v-divider></v-divider>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title class="detail-text">
              {{user.email}} on {{comment.createdAt | moment("DD-MMM-YY")}}
            </v-list-tile-title>
            <v-list-tile-title class="html" v-html="markdown(comment.text)"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile-action>
          <v-spacer></v-spacer>
          <v-btn 
            @click.native="deleteComment(comment._id, index)" 
            v-if="user.user_id === comment._user"
            class="delete" 
            icon 
            outline
            small 
            color="error"
            ><v-icon small>delete_outline</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'

export default {
  name: 'comment-list',
  data () {
    return {
      comment: ''
    }
  },
  props: ["comments"],
  computed: mapState({
    user: state => state.user
  }),
  methods: {
    markdown (text) {
      return marked(text, { sanitize: true })
    },
    deleteComment (id, index) {
      this.$store.dispatch('deleteComment', id)
      this.$store.dispatch('removeFromComments', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail-text
  font-size: 10px
  color: #9e9e9e

.action-item
  font-size: 10px

.heading
  font-size: 20px
  font-weight: 400

.comment-list
  margin: 0px 0px !important

.html
  margin: 5px
  padding: 5px

.delete
  margin-right: 20px
</style>
