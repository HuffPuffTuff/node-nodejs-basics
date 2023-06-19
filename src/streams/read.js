import { createReadStream } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const read = async () => {
  const filePath = resolve(__dirname, 'files', 'fileToRead.txt');
  const readableStream = new Readable({ encoding: 'utf-8', read() {} });
  const fileStream = createReadStream(filePath, 'utf-8');

  fileStream.on('data', (chunk) => {
    readableStream.push(chunk);
  });

  fileStream.on('end', () => {
    readableStream.push(null);
  });

  readableStream.pipe(process.stdout);

  fileStream.on('error', (err) => {
    console.error(err);
  });
};

await read();
