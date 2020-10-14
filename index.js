const minimist = require('minimist')
const { randomBytes } = require('crypto')
const net = require('net')
const { buildTrackerUrl, parseTorrentFile, getPeers, createPeerId } = require('./utils')


async function download() {
  const port = 7002
  const peerId = createPeerId()
  const argv = minimist(process.argv.slice(2))
  const torrent = parseTorrentFile(argv._[0])
  const trackerUrl = buildTrackerUrl(torrent, peerId, port)
  const peers = await getPeers(trackerUrl)
  peers.slice(0, 10).forEach(peer => {
    peer.handShake(torrent.infoHashBuffer, peerId)
  })
}





download()
