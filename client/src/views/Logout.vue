<template lang="html">
    <div>
      <h1>You've been logged out now.</h1>
      <h3>Thanks for stopping by!</h3>
    </div>
</template>

<script>
import { router } from '../router'
export default {
  name: 'logout',
  created () {
    setInterval(function () {
      router.push({ name: 'landing' })
    }, 3000)
  }
}
</script>

<style lang="css">
</style>
