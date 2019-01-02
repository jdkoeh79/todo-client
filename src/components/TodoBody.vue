<template>
  <div>

    <!-- <div v-if="typeof todo.body.id == 'undefined'">
      {{ todo }}
    </div> -->

    {{ todo }}
  </div>
</template>

<script>

export default {
  name: 'todo-body',
  props: [
    'todo',
    'depth'
  ]
}
</script>

<style scoped>

</style>
