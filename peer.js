const net = require('net')
const { constructHandshakeMessage } = require('./messages')

class Peer {

  constructor(ip, port) {
    if (!port || !ip)
      throw new Error("invalid peer data")
    this.ip = ip
    this.port = port
    this.client = new net.Socket()
    this.connected = false

    const self = this
    this.client.on('close', () => {
      this.connected = false
    })

    this.client.on('data', data => {
      console.log("receievd", self.ip, data.toString())
    })

    this.client.on('error', err => {
      console.log("errored", this.ip)
      this.connected = false
    })
  }

  handShake(infoHash, peerId) {
    const handShakeMsg = constructHandshakeMessage(infoHash, peerId)
    this.client.connect(this.port, this.ip, () => {
      console.log("connected", this.ip)
      this.connected = true
      this.client.write(handShakeMsg)
    })
  }


}



module.exports = Peer
