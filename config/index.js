const isDev = process.env.NODE_ENV === 'development'

export default {
  baseUrl: {
    dev: 'http://localhost:3000',
    pro: 'http://120.48.21.232'
  },
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '127.0.0.1' : '120.48.21.232'
  }
}
