<template lang="html">
  <v-card>
    <v-card-title>Comments</v-card-title>
    <v-list two-line>
      <v-list v-for="comment in comments">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-text>{{ comment.text }}</v-list-tile-text>
            <v-list-tile-text class="detail-text">posted by: {{user.email}} on {{comment.createdAt}}</v-list-tile-text>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile-action>
          <v-icon
            class="red--text text--lighten-1"
            v-if="user.user_id === comment._user">
              delete
          </v-icon> <span class="action-item">Delete</span>
        </v-list-tile-action>
      </v-list>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
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
    formatDate (data) {
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail-text
  font-size: 10px

.action-item
  font-size: 10px
</style>
