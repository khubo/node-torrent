


// <pstrlen><pstr><reserved><infohash><peerId>
module.exports.constructHandshakeMessage = (infoHash, peerId) => {

  const buf = Buffer.alloc(68)

  buf.writeUInt8(19, 0) // pstrlen - len of protocol indentifier
  buf.write('BitTorrent protocol', 1) // pstr - protocol identifier

  // reserved bytes
  buf.writeUInt32BE(0, 20)
  buf.writeUInt32BE(0, 24)

  infoHash.copy(buf, 28) // copy 20byte infohash
  peerId.copy(buf, 48) // copy peerId
  return buf
}
