<template>
  <div class="container">
    <div class="aboutTitle ellipsis">
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
  // layout: 'default-white',
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

<style lang="scss" scoped>
  .aboutTitle{
    width: 50px;
    color: #007fff;
  }
</style>
