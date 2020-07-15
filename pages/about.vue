<template>
  <div class="container">
    <div>
      我是about页面{{ name }}
    </div>
    <h1>{{ counter }}</h1>
    <button @click="increment">
      点我加一
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  asyncData (context) {
    return ({ name: 'pansihao' })
  },
  computed: {
    ...mapState(['counter'])
  },
  methods: {
    ...mapMutations(['increment'])
  }
}
</script>

<style></style>
