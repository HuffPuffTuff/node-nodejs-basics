import path from 'path';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';

const read = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const filePath = path.resolve(__dirname, 'files', 'fileToRead.txt');
  const stream = createReadStream(filePath);

  const strArray = [];

  stream.on('error', () => {
    throw new Error('FS operation failed');
  });

  stream.on('end', () => {
    const string = strArray[0].replace(/[\r\n]+/g, ' ');

    console.log(string);
  });

  stream.on('data', (chunk) => {
    strArray.push(chunk.toString());
  });
};

try {
  await read();
} catch (err) {
  throw err;
}
