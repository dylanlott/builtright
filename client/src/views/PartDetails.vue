<template>
  <v-container>
    <v-layout row wrap justify-space-around>
      <v-flex xs12 sm4 md5>
        <v-card> 
          <v-card-title><h2 class="display-2">{{ part.title }}</h2></v-card-title>
          <v-card-text>
            <h4>
              {{ part.make }}
              {{ part.model }}
            </h4>
            <h4>${{ part.price }}</h4>
          </v-card-text>
          <v-card-actions>
            <v-btn flat v-bind:href="part.url">Visit Site</v-btn>
          </v-card-actions>
        </v-card> 
      </v-flex>
    </v-layout>
    <v-layout column>
      <CommentList :comments="part._comments"></CommentList>
      <AddComment
        :source_id="part._id"
        resource="parts"
        update="getPartDetails"
      >
      </AddComment>
    </v-layout>
  </v-container>
</template>
<script>
import CommentList from '../components/CommentList.vue'
import AddComment from '../components/AddComment.vue'
import { mapState } from 'vuex'

export default {
  name: 'partDetails',
  data () {
    return {}
  },
  computed: mapState({
    part: state => state.parts.details
  }),
  created () {
    this.$store.dispatch('getPartDetails', this.$route.params.id)
  },
  components: {
    CommentList,
    AddComment
  }
}
</script>
<style lang="stylus" scoped>
.display-image
  height: 100%
  width: auto
  margin: 10px auto !important
</style>
