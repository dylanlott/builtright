<template lang="html">
  <v-card>
    <v-card-title>Comments</v-card-title>
    <v-list two-line>
      <v-list-item v-for="comment in comments.comments">
        <v-list-tile avatar ripple>
          <v-list-tile-content>
            <v-list-tile-title>{{ comment.user }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ comment.text }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile-action>
          <v-icon
            class="grey--text text--lighten-1"
            v-if="user.user_id === comment.user">
              delete
          </v-icon>
        </v-list-tile-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      comment: ''
    }
  },
  computed: mapState({
    comments: state => state.comments,
    user: state => state.user
  })
}
</script>

<style lang="stylus">
</style>
