<template lang="html">
<v-container flex>
  <div class="post-details">
    <v-card>
      <v-card-row class="grey darken-1">
        <v-card-title>
          <span class="white--text">{{ details.title }}</span>
          <v-spacer></v-spacer>
          <div>
            <v-menu id="post-menu" bottom left origin="top right">
              <v-btn icon="icon" slot="activator" class="white--text">
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-item>
                  <v-list-tile>
                    <v-list-tile-title>Report this post</v-list-tile-title>
                  </v-list-tile>
                </v-list-item>
                <v-list-item v-if="details.user === user.user_id">
                  <v-list-tile>
                    <v-list-tile-title>Delete this post</v-list-tile-title>
                  </v-list-tile>
                </v-list-item>
                <v-list-item>
                  <v-list-tile>
                    <v-list-tile-title>Save this post</v-list-tile-title>
                  </v-list-tile>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-card-title>
      </v-card-row>

      <v-card-text>
        <v-card-row>
          <v-card-text class="text-left">
            <div>{{ details.text }}</div>
          </v-card-text>
        </v-card-row>
      </v-card-text>

      <CommentList></CommentList>
      <AddComment></AddComment>

    </v-card>
  </div>
</v-container>
</template>

<script>
import { mapState } from 'vuex'
import CommentList from '../components/CommentList.vue'
import AddComment from '../components/AddComment.vue'

export default {
  computed: mapState({
    user: state => state.user,
    details: state => state.posts.postDetails,
    comments: state => state.comments
  }),
  created () {
    this.$store.dispatch('getPostDetails', this.$route.params.id)
    this.$store.dispatch('getComments', this.$route.params.id)
  },
  components: {CommentList, AddComment}
}
</script>

<style lang="stylus">
</style>
