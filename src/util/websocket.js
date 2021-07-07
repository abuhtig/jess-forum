import store from '../store'
class WebSocketClient {
  constructor (config = {}) {
    const defaultConfig = {
      port: 3001,
      url: '127.0.0.1',
      protocol: 'ws'
    }

    const finalConfig = { ...defaultConfig, ...config }
    this.wsc = {}
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    this.port = finalConfig.port
  }

  init () {
    this.wsc = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.wsc.onopen = this.onOpne
    this.wsc.onmessage = this.onMessage
    this.wsc.onclose = this.onClose
    this.wsc.onerror = this.onError
  }

  send (msg) {
    this.ws.send(msg)
  }

  onOpne () {
    this.send(JSON.stringify({
      event: 'auth',
      msg: 'Bearer ' + store.state.token
    }))
  }

  onMessage (event) {
    const obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'noauth':
        break
      case 'heartbeat':
        this.ws.send(JSON.stringify({
          event: 'heartbeat',
          msg: 'pong'
        }))
        break
      default:
        store.dispatch(obj.event, obj)
    }
  }

  onClose () {
    this.ws.close()
  }

  onError () {
    setTimeout(() => {
      this.init()
    }, 1000)
  }
}

export default WebSocketClient
