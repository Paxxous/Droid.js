const fs = require('fs');

const remember = JSON.parse(fs.readFileSync('./commands/remember/remember.json'));
const userNote = remember['793493333405990932'];

console.log(userNote);