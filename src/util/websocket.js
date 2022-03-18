import store from '../store'
import configurl from '../../config/index'
class WebSocketClient {
  constructor (config = {}) {
    const defaultConfig = {
      port: 3001,
      url: configurl.wsconfig.url,
      protocol: configurl.wsProtocol.protocol,
      timeInterval: 30 * 1000
    }

    const finalConfig = { ...defaultConfig, ...config }
    this.ws = {}
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    this.port = finalConfig.port
    this.handle = null
    this.timeInterval = finalConfig.timeInterval
  }

  init () {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}/wss`)
    this.ws.onopen = () => this.onOpne()
    this.ws.onmessage = (msg) => this.onMessage(msg)
    this.ws.onclose = () => this.onClose()
    this.ws.onerror = () => this.onError()
  }

  send (msg) {
    this.ws.send(msg)
  }

  onOpne () {
    this.send(JSON.stringify({
      event: 'auth',
      msg: 'Bearer ' + store.state.token
    }))
    this.checkServer()
  }

  onMessage (event) {
    const obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'noauth':
        break
      case 'heartbeat':
        this.checkServer()
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

  checkServer () {
    clearTimeout(this.handle)
    this.handle = setTimeout(() => {
      this.onClose()
      setTimeout(() => {
        this.init()
      }, 1000)
    }, this.timeInterval + 1000)
  }
}

export default WebSocketClient
