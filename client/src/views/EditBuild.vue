<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-toolbar card color="accent" dark>
          <v-toolbar-title>
            Edit build
          </v-toolbar-title>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                label="Name"
                :value="details.title"
                v-model="updated.title"
              ></v-text-field>
              <v-text-field
                label="Make"
                :value="details.vehicle.make"
                v-model="updated.vehicle.make"
                ></v-text-field>
              <v-text-field
                label="Model"
                :value="details.vehicle.model"
                v-model="updated.vehicle.model"
                ></v-text-field>
              <v-text-field
                label="Trim"
                :value="details.vehicle.trim"
                v-model="updated.vehicle.trim"
                ></v-text-field>
              <v-text-field
                label="Year"
                :value="details.vehicle.year"
                v-model="updated.vehicle.year"
                ></v-text-field>
              <v-btn color="primary" @click="update()">Update Build</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'editBuild',
  computed: mapState({
    id: state => state.builds.details._id,
    details: state => state.builds.details,
    user: state => state.user,
    vehicle: state => state.builds.details.vehicle,
    updated: state => state.builds.details
  }),
  created () {
    this.$store.dispatch('getBuildDetails', this.$route.params.id)
  },
  methods: {
    update () {
      const payload = {
        build: this.updated,
        id: this.$route.params.id
      }
      this.$store.dispatch('updateBuild', payload)
    }
  }
}
</script>
