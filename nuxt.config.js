
export default {
  mode: 'universal',
  target: 'server',
  head: {
    title: '志愿河南 河南志愿 河南新时代文明实践中心|官网',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '志愿河南 河南志愿是河南志愿者的服务信息系统，提升各地志愿服务参与度和活跃度，实现河南志愿服务系统的有效管理及组织，促进全省志愿服务蓬勃发展。' },
      { hid: 'Keywords', name: 'Keywords', content: '志愿河南,河南志愿,河南志愿者,河南志愿服务,河南文明实践中心' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: 'blue',
    height: '3px'
  },
  layoutTransition: 'page',
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/scss/global.scss'
  ],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    proxy: true,
    prefix: process.env.NODE_ENV === 'production' ? '/' : '/api/',
    credentials: true
  },
  proxy: {
    '/api/': { target: 'https://www.hnzy.cn/', pathRewrite: { '^/api/': '' } }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [/^element-ui/]
  }
}
