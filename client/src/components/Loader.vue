<template>
  <v-progress-linear :indeterminate="loading"></v-progress-linear>
</template>
<script>
export default {
  name: 'loader',
  props: ['loading']
}
</script>
