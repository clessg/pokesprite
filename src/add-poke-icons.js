'use strict';

const fs = require('fs');
const path = require('path');
const pokemonDB = require('./pokemon-db');

const srcDir = process.argv[2];
const distDir = process.argv[3];

if (!srcDir || !distDir) {
  console.log('USAGE: node add-poke-icons.js src-dir dist-dir');
  process.exit(1);
}

const files = fs.readdirSync(srcDir);

files.forEach((filename) => {
  if (filename.indexOf(".png") === -1) {
    return;
  }

  const fullName = filename.replace('.png', '');
  let name = fullName.split('-')[0];
  let form = fullName.split('-').slice(1).join('-');

  // We split on hyphens, but some Pokemon (Ho-oh) have them in their name.
  // So we fix it here.
  if (name === 'ho') {
    name = 'ho-oh';
    form = '';
  } else if (name === 'nidoran') {
    if (form === 'm') {
      name = 'nidoran-m';
    } else {
      name = 'nidoran-f';
    }

    form = '';
  } else if (name === 'porygon' && form === 'z') {
    name = 'porygon-z';
    form = '';
  } else if (name === 'mr' && form === 'mime') {
    name = 'mr-mime';
    form = '';
  } else if (name === 'mime' && form === 'jr') {
    name = 'mime-jr';
    form = '';
  }

  const poke = pokemonDB.find(poke => poke.name === name);

  if (!poke) {
    throw new Error('Nonexistent Pokemon: ' + fullName);
  }

  let num = poke.num.toString();

  if (num.length === 1) {
    num = '00' + num;
  } else if (num.length === 2) {
    num = '0' + num;
  }

  const formText = form && ('-' + form);
  const oldPath = path.resolve(srcDir, filename);
  const newPath = path.resolve(distDir, num + formText + '.png');
  const fileBuffer = fs.readFileSync(oldPath);

  fs.writeFileSync(newPath, fileBuffer);
});
