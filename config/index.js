const isDev = process.env.NODE_ENV === 'development'

export default {
  baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'http://120.48.21.232:3000',
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '127.0.0.1' : '120.48.21.232'
  }
}
