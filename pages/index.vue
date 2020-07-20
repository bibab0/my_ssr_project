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
      <div>ip展示为{{ indexData }}</div>
      <div>{{ jsondata }}</div>
      <h3>新闻列表</h3>
      <div>{{ newsData }}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  async asyncData ({ app }) {
    const [indexData, newsData] = await Promise.all([
      app.$axios.$post('/pc/indexmapcityinfo', {
        cityName: '郑州市'
      }).then(res => res)
        .catch(() => {
          return '请求出错'
        }),
      app.$axios.$post('pc/news/list', {
        page: 1,
        size: 10,
        channelId: 5
      }).then(res => res)
        .catch(() => {
          return '请求出错'
        })
    ])
    return { indexData, newsData }
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
  mounted () {
    // this.getData()
  },
  methods: {
    ...mapMutations(['increment']),
    async fetchSomething () {
      const ip = await this.$axios.$get('http://icanhazip.com')
      this.ip = ip
    },
    getData () {
      this.$axios({
        url: '/pc/indexmapcityinfo',
        method: 'post',
        data: { cityName: '郑州市' }
      }).then(({ data }) => {
        this.jsondata = data
      }).catch(() => {})
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
</style>
