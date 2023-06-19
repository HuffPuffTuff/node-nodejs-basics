import { resolve } from 'path';
import { createWriteStream, createReadStream } from 'node:fs';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';

const compress = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const fileToCompressPath = resolve(__dirname, 'files', 'fileToCompress.txt');
  const compressedFilePath = resolve(__dirname, 'files', 'archive.gz');

  const readStream = createReadStream(fileToCompressPath);
  const writeStream = createWriteStream(compressedFilePath);

  const gzip = createGzip();

  readStream.pipe(gzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log(
      `File fileToCompress.txt compressed to archive.gz successfully.`
    );
  });

  writeStream.on('error', (err) => {
    console.error('An error occurred during compression:', err);
  });
};

await compress();
