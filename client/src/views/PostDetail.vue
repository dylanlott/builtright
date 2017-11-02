<template lang="html">
  <v-layout>
    <v-flex>
      <v-container> 
        <v-card>
          <v-card-title class="title" v-html="this.formatted(details.title)"></v-card-title>
          <v-card-text>
            <v-layout>
              <v-card-text class="tags">
                <v-chip v-for="tag in details.tags">{{tag}}</v-chip>
              </v-card-text>
              <v-card-text class="text-left" v-html="this.formatted(details.body)"></v-card-text>
            </v-layout>
          </v-card-text>

          <CommentList :comments="details._comments"></CommentList>
          <AddComment 
            :source_id="details._id"
            update="getPostDetails"
            resource="posts">
          </AddComment>

        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
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
      return marked(data, { sanitize: true })
    }
  },
  components: {
    CommentList,
    AddComment
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
