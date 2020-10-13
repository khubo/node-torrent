const minimist = require('minimist')
const { randomBytes } = require('crypto')
const { buildTrackerUrl, parseTorrentFile, getPeers, createRandomId } = require('./utils')


async function download() {
  const port = 7002
  const peerId = createRandomId()
  const argv = minimist(process.argv.slice(2))
  const torrent = parseTorrentFile(argv._[0])
  const trackerUrl = buildTrackerUrl(torrent, peerId, port)
  const res = await getPeers(trackerUrl)
  console.log("peers are", res)
}

download()
