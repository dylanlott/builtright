<template lang="html">
  <div>
    <v-card class="forgot__container">
      <v-card-text>
        <h3>I forgot my password!</h3>

        <p>
          No worries, just tell us your email and we'll send you a new one.
        </p>
      </v-card-text>
      <v-card-text>

        <v-text-input
          id="Email"
          name="Email"
          type="Email"
          label="Email"
          v-model="email"
          required
        ></v-text-input>

      </v-card-text>

      <v-btn success>
        Reset Password
      </v-btn>

    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {
    submit: function () {
      const email = this.email
      this.$store.dispatch('resetPassword', email)
    }
  },
  components: {}
}
</script>

<style lang="stylus">
.forgot__container
  padding: 20px
</style>
