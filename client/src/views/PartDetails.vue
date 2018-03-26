<template>
  <v-container>
    <v-layout row wrap justify-space-around>
      <v-flex xs12 sm4 md5>
        <v-card> 
          <v-card-title><h2 class="display-2">{{ part.title }}</h2></v-card-title>
          <v-card-text>
            <h4>{{ part.make }}</h4>
            <h4>{{ part.model }}</h4>
            <h4>{{ part.price }}</h4>
            <h4>{{ part.url }}</h4>
          </v-card-text>
        </v-card> 
      </v-flex>
      <v-flex xs12 sm4 md5>
        <v-card>
          <img class="ma-4" height="300" width="300" src="https://placehold.it/300x300"/>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout column justify-space-around>
      <v-card>
        <v-card-title>Comments</v-card-title>
        <v-card>
          <CommentList :comments="part._comments"></CommentList>
        </v-card>
        <v-card>
          <AddComment
            :source_id="part._id"
            resource="parts"
            update="getPartDetails"
          >
          </AddComment>
        </v-card>
      </v-card>
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
