
const fetch = require('node-fetch')
const fs = require('fs')
const parseTorrent = require('parse-torrent')
const bencode = require('bencode')


function parseTorrentFile(filePath) {
  const torrentBuffer = fs.readFileSync(filePath)
  const torrentInfo = parseTorrent(torrentBuffer)
  return torrentInfo
}

function buildTrackerUrl(torrent, peerId, port) {

  const url = torrent.announce[0]
  const infoHash = torrent.infoHashBuffer
  const queryString = '?info_hash=' + escape(infoHash.toString('binary')) +
    '&peer_id=' + escape(peerId.toString('binary')) +
    '&port=' + port +
    '&uploaded=' + 0 +
    '&downloaded=' + 0 +
    '&left=' + 0 +
    '&compact=1' +
    '&numwant=200' +
    '&event=empty'

  return `${url}${queryString}`
}

async function getPeers(uri) {
  const response = await fetch(uri).then(res => res.arrayBuffer()).then(bencode.decode)
  var peers = Buffer.from(response.peers, 'binary')
  const peerList = []
  for (var i = 0; i < peers.length; i += 6) {
    var ip = peers[i] + '.' + peers[i + 1] + '.' + peers[i + 2] + '.' + peers[i + 3];
    var port = peers[i + 4] << 8 | peers[i + 5];
    peerList.push({
      ip, port
    })
  }
  return peerList
}

function createPeerId(clientIdentifier = '-NT0010') {

  const id = Buffer.alloc(20)
  id.write(clientIdentifier, 0, 'ascii')

  for (var i = clientIdentifier.length; i < 20; i++) {
    id[i] = Math.floor(Math.random() * 255);
  }
  return id
}

module.exports.createPeerId = createPeerId
module.exports.getPeers = getPeers
module.exports.buildTrackerUrl = buildTrackerUrl
module.exports.parseTorrentFile = parseTorrentFile
