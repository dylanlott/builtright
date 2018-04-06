<template lang="html">
  <div>
    <v-container flex>
      <router-link :to="{ name: 'addPost' }" class="routerlink">
        <v-btn fab light v-tooltip:top="{ html: 'Write A Forum Post' }" name="addPost" raised floating class="cyan lighten-2 floating">
          <v-icon class="white--text">create</v-icon>
        </v-btn>
      </router-link>

      <!-- <v-expansion-panel>
        <v-expansion-panel-content>
          <div slot="header">Filter and sort posts</div>
          <v-card>
            <v-card-text class="">
              <v-layout row wrap>
                <v-flex xs12 md3>
                  <v-card class="primary">
                    <v-card-text>
                      Type: <v-select></v-select>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex xs12 md3>
                  <v-card class="primary">
                    <v-card-text>
                      Year <v-select></v-select>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex xs12 md3>
                  <v-card class="primary">
                    <v-card-text>
                      Make <v-select></v-select>
                    </v-card-text>
                  </v-card>
                </v-flex>

                <v-flex xs12 md3>
                  <v-card class="primary">
                    <v-card-text>
                      Model <v-select></v-select>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>

            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel> -->

      <div class="posts">
        <div v-if="!(posts.data)">
          <p style="color: #fff">There are no posts to show here.</p>
        </div>
        <div v-for="item in posts">
          <router-link :to="{ name: 'postDetail', params: { id: item.slug }}">
            <div class="post-list elevation-1">
              <v-list two-line class="post-list">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="item.title" />
                    <v-list-tile-sub-title v-html="item.text" />
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </div>
          </router-link>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'forum',
  computed: mapState({
    user: state => state.user,
    posts: state => state.posts.posts
  }),
  created () {
    this.$store.dispatch('getPosts')
  }
}
</script>

<style lang="stylus">
@import '../css/theme.styl'

.filters
  margin-top: 20px

.forum
  margin: 20px

.posts
  margin: 20px

.post-list
  margin: 0px 0px !important

</style>
