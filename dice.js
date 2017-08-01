function dice() {
  if (_.random(1,100) <= 42) return 1 
  return -1 // you lose :'-(
}

module.exports = dice
