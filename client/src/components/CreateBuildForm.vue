    <template>
  <div>
    <h1 class="header">Create A New Build</h1>

    <v-text-field
      class="build__input"
      id="Build Name"
      name="Build Name"
      label="Build Name"
      v-model="build.name"
      required
    ></v-text-field>

    <v-text-field
      class="build__input"
      id="Build make"
      name="Build make"
      label="Build make"
      v-model="build.make"
      required
    ></v-text-field>

    <v-text-field
      class="build__input"
      id="Build Model"
      name="Build Model"
      label="Build Model"
      v-model="build.model"
      required
    ></v-text-field>

    <v-text-field
      class="build__input"
      id="Build Year"
      name="Build Year"
      label="Build Year"
      v-model="build.year"
      required
    ></v-text-field>

    <v-text-field
      class="build__input"
      id="Build Trim"
      name="Build Trim"
      label="Build Trim"
      v-model="build.trim"
      required
    ></v-text-field>

    <div>
      <v-btn raised @click.native='submit()' class="build__btn">Create Build</v-btn>
    </div>
</div>
</template>

<script>
import user from '../api/user'
import { router } from '../router/index'

const storage = window.localStorage

export default {
  data () {
    return {
      build: {
        name: '',
        make: '',
        model: '',
        year: '',
        trim: ''
      }
    }
  },
  methods: {
    submit: function () {
      const user = storage.getItem('user_id')
      const token = storage.getItem('token')
      const build = {
        user: user,
        token: token,
        name: this.build.name,
        make: this.build.make,
        model: this.build.model,
        year: this.build.year,
        trim: this.build.trim
      }
      console.log(build)
      this.$store.dispatch('createNewBuild', build)
      router.push({ name: 'builds'})
    }
  }
}
</script>

<style lang="stylus">
@import '../css/theme.styl'
  .header
    color: charcoal

  .input-group label
    color: light-blue

  .build__input
    color: blue

  label
    color: blue

  .build__btn
    background-color: orange
    color: white
</style>
