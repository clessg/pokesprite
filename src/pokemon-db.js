const fs = require('fs');

const pokemonDB = fs.readFileSync('./pokemon-db.txt', 'utf8')
  .split('\n')
  .map(poke => poke.split(','))
  .map(poke => ({ num: parseInt(poke[0], 10), name: poke[1] }));

module.exports = pokemonDB;
