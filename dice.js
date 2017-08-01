function dice() {
  if (_.random(1,10) > 6) return 1 
  return -1 // you lose :'-(
}

module.exports = dice
