const isDev = process.env.NODE_ENV === 'development'

export default {
  baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.toped.top:444',
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '127.0.0.1' : 'toped.top'
  },
  wsProtocol: {
    protocol: isDev ? 'ws' : 'wss',
    wss: isDev ? '/' : '/wss'
  }
}
