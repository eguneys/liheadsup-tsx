
export function generic_handlers(handlers: Handlers) {
  Socket.generic_handlers = handlers
}

export type Handlers = { [_: string]: (_: any) => void }

export class Socket {

  static me?: string

  static generic_handlers?: Handlers

  static make = (route: string, handlers: Handlers) => {
    let res = new Socket()
    res.listen(route, handlers)
    return res
  }

  _onClose(event: CloseEvent) {
    this.socket = undefined
    if (!this.disposed) {
      this.scheduleReconnect()
    }
  }
  _onOpen(event: Event) {
    this.ping()
  }

  _onError(event: Event) {
    this.socket = undefined
    if (!this.disposed) {
      this.scheduleReconnect()
    }
  }

  _onMessage(event: MessageEvent) {
    let {t, d} = JSON.parse(event.data)

    if (this.handlers[t]) {
      this.handlers[t](d)
    } else {
      if (Socket.generic_handlers?.[t]) {
        Socket.generic_handlers[t](d);
      } else {
        console.warn('Unhandled message', t, d)
      }
    }
  }

  send(t: string, d?: any) {
    this.socket?.send(JSON.stringify({ t, d }))
  }

  ping() {
    clearTimeout(this.pingId)

    this.pingId = setTimeout(() => {
      this.pingNow()
      this.ping()
    }, 1000)
  }

  pingNow() {
    if (!this.reconnectId) {
      this.scheduleReconnect()
    }
    this.send('p')
  }


  pingId?: number
  reconnectId?: number
  socket?: WebSocket
  route!: string

  handlers!: Handlers

  disposed: boolean = false

  destroy() {
    this.disposed = true
    clearTimeout(this.reconnectId)
    clearTimeout(this.pingId)
    this.socket?.close()
  }

  listen(route: string, handlers: Handlers) {
    this.handlers = handlers
    this.route = route
    this.reconnectNow()
  }

  scheduleReconnect() {
    clearTimeout(this.reconnectId)

    this.reconnectId = setTimeout(() => {
      this.reconnectId = undefined
      this.reconnectNow()
    }, 5000)
  }

  reconnectNow() {

    if (this.socket) {
      this.socket.close()
    }

    let base = 'ws://localhost:3456'
    let socket = new WebSocket(`${base}/${this.route}`)

    socket.addEventListener('open', (event) => {
      this.socket = socket
      this._onOpen(event)
    })


    socket.addEventListener('message', (event) => {
      if (event.data === '0') {
        this.scheduleReconnect()
      } else {
        this._onMessage(event)
      }
    })

    socket.addEventListener('error', (event) => {
      this._onError(event)
    })

    socket.addEventListener('close', (event) => {
      this._onClose(event)
    })
  }

}
