<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        my_ssr_demo2
      </h1>
      <h2>{{ name }}</h2>
      <h2>{{ counter }}</h2>
      <nuxt-link to="/about">
        about
      </nuxt-link>
      <button @click="increment">
        点我加一
      </button>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >GitHub</a>
      </div>
      <div>ip展示为{{ ip }}</div>
      <div>{{ jsondata }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  async asyncData ({ app }) {
    const ip = await app.$axios.$get('http://icanhazip.com')
    return {
      ip
    }
  },
  data () {
    return {
      title: 'hello,panshihao',
      name: 'hahahahahahah',
      jsondata: ''
    }
  },
  computed: {
    ...mapState(['counter'])
  },
  created () {
    this.getData()
  },
  methods: {
    ...mapMutations(['increment']),
    async fetchSomething () {
      const ip = await this.$axios.$get('http://icanhazip.com')
      this.ip = ip
    },
    getData () {
      this.$axios.$post('/kyj/material/list', {
        pageNumber: 1,
        pageSize: 20
      })
        .then((res) => {
          this.jsondata = res
        })
        .catch(() => {})
    }
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description', name: 'description', content: '我的ssr应用'
        }
      ]
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
