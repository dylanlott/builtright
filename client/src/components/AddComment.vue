<template lang="html">
  <v-card>
    <v-card-title style="font-size: 16px;">Add to the discussion</v-card-title>
    <v-card-text class="grey lighten-3">
      <v-layout row padded>
         <v-text-field
           name="comment"
           label="Add a comment"
           v-model="comment.text"
           multi-line
         ></v-text-field>
       </v-layout>
       <v-layout>
         <v-btn primary dark @click.native="submitComment()" class="white--text">Submit</v-btn>
       </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      comment: {
        text: ''
      }
    }
  },
  computed: mapState({
    comments: state => state.comments,
    user: state => state.user
  }),
  methods: {
    submitComment: function () {
      const _comment = {
        text: this.comment.text,
        user: this.user.user_id,
        source: this.$route.params.id
      }
      console.log('_comment: ', _comment)
      this.$store.dispatch('addComment', _comment)
      this.comment = ''
    }
  }
}
</script>

<style lang="css">
</style>
