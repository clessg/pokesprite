'use strict';

const fs = require('fs');
const path = require('path');
const pokemonDB = require('./pokemon-db');

const srcDir = process.argv[2];
const distDir = process.argv[3];

if (!srcDir || !distDir) {
  console.log('USAGE: node add-custom-icons.js src-dir dist-dir');
  process.exit(1);
}

const files = fs.readdirSync(srcDir);

files.forEach((filename) => {
  if (filename.indexOf(".png") === -1) {
    return;
  }

  const oldPath = path.resolve(srcDir, filename);
  const newPath = path.resolve(distDir, filename);
  const fileBuffer = fs.readFileSync(oldPath);

  fs.writeFileSync(newPath, fileBuffer);
});
