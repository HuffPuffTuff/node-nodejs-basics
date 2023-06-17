import { resolve } from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const remove = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const oldFilePath = resolve(__dirname, 'files', 'fileToRemove.txt');

  try {
    await fs.unlink(oldFilePath);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

try {
  await remove();
} catch (err) {
  throw err;
}
