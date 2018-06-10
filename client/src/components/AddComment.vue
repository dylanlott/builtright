<template lang="html">
  <v-card>
    <v-card-title class="heading">Add a comment</v-card-title>
    <v-card-text>
      <v-layout column padded>
        <v-text-field
          name="comment"
          label="Add a comment"
          v-model="comment.text"
          multi-line
          @keyup.enter="submitComment()"
        ></v-text-field>
        <v-btn primary dark @click.native="submitComment()" class="white--text">Submit</v-btn>
        <div class="preview">
        <v-card dark class="grey darken-1">
          <v-card-title>Preview</v-card-title>
          <v-card-text v-html="compiledMarkdown()" class="preview"></v-card-text>
        </v-card>
        </div>
      </v-layout>
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
  props: [
    "source_id",
    "resource",
    "update"
  ],
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
        _user: this.user.user_id,
        _source: this.$route.params.id,
        _source_id: this.source_id,
        parent: this.comment.parent
      }

      this.$store.dispatch('addComment', {
        resource: this.resource,
        id: this.$route.params.id,
        comment: _comment
      }).then((res) => {
        this.$ga.event('comments', 'added comment', 'no campaign')
        this.comment.text = ''
        this.$store.dispatch(`${this.update}`, this.$route.params.id)
      })
    }
  }
}
</script>

<style lang="stylus">
.preview
  text-align: left

.heading
  font-size: 24px
  font-weight: 400

.preview
  margin: 20px 8px
</style>
