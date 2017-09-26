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
        <v-card>
          <v-card-title>Preview</v-card-title>
          <v-card-text v-html="compiledMarkdown()" class="preview"></v-card-text>
       </v-card> 
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import marked from 'marked'

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
    compiledMarkdown () {
      return marked(this.comment.text, { sanitize: true }) 
    },
    submitComment () {
      const _comment = {
        text: this.comment.text,
        user: this.user.user_id,
        _source: this.$route.params.id,
        parent: this.comment.parent
      }

      this.$store.dispatch('addComment', { 
        resource: 'posts',
        id: this.$route.params.id, 
        comment: _comment
      })
    }
  }
}
</script>

<style lang="stylus">
.preview
  text-align: left
</style>
