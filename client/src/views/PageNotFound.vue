<template>
  <div>
    <h1 style="color: #fff">404 Page not available</h1>
    <p style="color: #fff">
      {{message}}
    </p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        message: 'We cant seem to find that page at this time'
      }
    }
  }
</script>
