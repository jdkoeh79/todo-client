<template>
  <h1>{{ response }}</h1>
</template>

<script>
import WaveService from '@/services/WaveService'

export default {
  data () {
    return {
      name: 'Justin',
      response: null
    }
  },
  async mounted () {
    const response = (await WaveService.wave({
      name: this.name
    })).data
    this.response = response.message
  }
}
</script>

<style scoped>

</style>
