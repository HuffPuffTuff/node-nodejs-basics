import { resolve } from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const rename = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const oldFilePath = resolve(__dirname, 'files', 'wrongFilename.txt');
  const newFilePath = resolve(__dirname, 'files', 'properFilename.md');

  try {
    await fs.rename(oldFilePath, newFilePath);
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

try {
  await rename();
} catch (err) {
  throw err;
}
