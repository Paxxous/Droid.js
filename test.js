const fs = require('fs');
var { shillcount } = require('./commands/shill/shillcount.json');

// Read the json file
let shill = JSON.parse(fs.readFileSync('./commands/shill/shillcount.json'));
shill = JSON.stringify(shill, null, 2);

// Before
console.log(shill);


// After
console.log(shill.shillcount);

fs.writeFileSync('./commands/shill/shillcount.json', shill);
