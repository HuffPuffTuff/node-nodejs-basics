import { resolve } from 'path';
import { promises as fs, createWriteStream } from 'node:fs';
import { fileURLToPath } from 'url';

const create = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const filePath = resolve(__dirname, 'files', 'text.txt');

  const isFile = await fs
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (isFile) {
    throw new Error('FS operation failed');
  } else {
    const output = createWriteStream(filePath);
    output.write('I am fresh and young');
  }
};

try {
  await create();
} catch (err) {
  throw err;
}
