<template lang="html">
  <v-container fluid>
    <v-layout row>
      <v-btn dark color="grey" router :to="{ name: 'forum' }">
        <v-icon dark>arrow_left</v-icon> Back to forum
      </v-btn>
    </v-layout>
    <v-layout column>
      <v-flex xs12>
        <v-card class="mb-4" transition="slide-y-transition">
          <v-card-title class="title" v-html="this.formatted(details.title)"></v-card-title>
          <v-card-text>
            <v-layout column>
              <v-card-text class="tags">
                <v-chip v-for="tag in details.tags">{{tag}}</v-chip>
              </v-card-text>
              <v-card-text class="left">
                <p v-html="this.formatted(details.body)"></p>
              </v-card-text>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn color="info"  @click="downvote(details._id)">{{ details._downvotes.length }}
              <v-icon>keyboard_arrow_down</v-icon>
            </v-btn>
            <v-btn color="info" @click="upvote(details._id)">{{ details._upvotes.length}}
              <v-icon>keyboard_arrow_up</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

        <CommentList :comments="details._comments"></CommentList>
        <AddComment
          :source_id="details._id"
          update="getPostDetails"
          resource="posts">
        </AddComment>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import CommentList from '../components/CommentList.vue'
import AddComment from '../components/AddComment.vue'
import marked from 'marked'

export default {
  computed: mapState({
    user: state => state.user,
    details: state => state.posts.postDetails
  }),
  created () {
    this.$store.dispatch('getPostDetails', this.$route.params.id)
  },
  methods: {
    formatted (data) {
      if (data) {
        return marked(data, { sanitize: true })
      }
    },
    downvote (id) {
      this.$store.dispatch('downvotePost', id)
    },
    upvote (id) {
      this.$store.dispatch('upvotePost', id)
    }
  },
  components: {
    CommentList,
    AddComment
  }
}
</script>

<style lang="stylus">
.title
  font-size: 1.4rem
  margin: 15px 15px 0px 15px
</style>
