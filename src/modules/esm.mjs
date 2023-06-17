import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { URL } from 'url';

import aJson from './files/a.json' assert { type: 'json' };
import bJson from './files/b.json' assert { type: 'json' };

import './files/c.js';

const random = Math.random();
const __dirname = new URL('.', import.meta.url).pathname;
const __filename = new URL('', import.meta.url).pathname;
let unknownObject;

console.log(__dirname, __filename);

if (random > 0.5) {
  unknownObject = aJson;
} else {
  unknownObject = bJson;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export default { unknownObject, myServer };
