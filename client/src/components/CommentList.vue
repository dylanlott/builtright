<template lang="html">
  <v-card>
    <v-card-title>Comments</v-card-title>
    <v-list two-line>
      <v-list v-for="comment in comments">
        <v-list-tile avatar ripple>
          <v-list-tile-content>
            <v-list-tile-text>{{ comment.text }}</v-list-tile-text>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile-action>
          <code>{{ user.user_id }}</code>
          <code> {{ comment }} </code>
          <v-icon
            class="grey--text text--lighten-1"
            v-if="user.user_id === comment.user">
              delete
          </v-icon>
        </v-list-tile-action>
      </v-list>
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
  props: ["comments"],
  computed: mapState({
    user: state => state.user
  })
}
</script>

<style lang="stylus">
</style>
