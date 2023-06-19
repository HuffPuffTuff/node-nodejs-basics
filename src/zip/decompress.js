import { resolve } from 'path';
import { createWriteStream, createReadStream } from 'node:fs';
import { fileURLToPath } from 'url';
import { createGunzip } from 'zlib';

const decompress = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const compressedFilePath = resolve(__dirname, 'files', 'archive.gz');
  const decompressedFilePath = resolve(
    __dirname,
    'files',
    'fileToCompress.txt'
  );

  const readStream = createReadStream(compressedFilePath);
  const writeStream = createWriteStream(decompressedFilePath);

  const unzip = createGunzip();

  readStream.pipe(unzip).pipe(writeStream);

  writeStream.on('finish', () => {
    console.log(
      `File archive.gz decompressed to fileToCompress.txt successfully.`
    );
  });

  writeStream.on('error', (err) => {
    console.error('An error occurred during decompression:', err);
  });
};

await decompress();
