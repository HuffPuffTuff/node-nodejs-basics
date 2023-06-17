import path from 'path';
import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';

const read = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const filePath = path.resolve(__dirname, 'files', 'fileToRead.txt');

  const stream = createReadStream(filePath);

  stream.on('error', () => {
    throw new Error('FS operation failed');
  });

  stream.on('data', (data) => {
    console.log(data.toString());
  });
};

try {
  await read();
} catch (err) {
  throw err;
}
