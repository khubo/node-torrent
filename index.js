const minimist = require('minimist')
const { randomBytes } = require('crypto')
const { buildTrackerUrl, parseTorrentFile, getPeers } = require('./utils')


const peerId = randomBytes(20) // generate a random id for the peer
const port = 7002

async function download() {
  const argv = minimist(process.argv.slice(2))
  const torrent = parseTorrentFile(argv._[0])
  const trackerUrl = buildTrackerUrl(torrent, peerId, port)
  const res = await getPeers(trackerUrl)
  console.log("peers are", res)
}

download()
