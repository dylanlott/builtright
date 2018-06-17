<template lang="html">
  <div>
      <v-layout column>
        <v-flex>
          <v-btn 
            fab 
            top
            name="addPost" 
            style="z-index: 9999;"
            :to="{ name: 'addPost' }" 
            class="cyan lighten-1 floating"
            ><v-icon class="white--text">create</v-icon>
          </v-btn>
        </v-flex>
        <v-flex class="posts">
            <v-card>
              <v-toolbar color="primary" dark>
                <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
                <v-toolbar-title class="heading"><b>Posts &amp; Discussion</b></v-toolbar-title>
              </v-toolbar>
              <v-list three-line>
                <template v-for="(item, index) in posts">
                  <v-list-tile avatar :key="item.title" :to="{ name: 'postDetail', params: { id: item.slug }}"> 
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                      <v-list-tile-sub-title class="subtitle" v-html="item.body"></v-list-tile-sub-title>
                      <v-list-tile-sub-title class="small--text">
                        posted by {{ item._user.email }}
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </template>
              </v-list>
              </v-card>
        </v-flex>
      </v-layout>

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

.small--text
  font-size: 10px

.subtitle
  font-size:12px
</style>
