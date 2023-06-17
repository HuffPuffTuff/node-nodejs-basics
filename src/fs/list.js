import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const list = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));

  try {
    const files = await fs.readdir(path.join(__dirname, 'files'), {
      withFileTypes: true,
    });

    files.forEach((file) => {
      const extname = path.extname(file.name);
      const filename = file.name.slice(0, -extname.length);
      console.log(filename);
    });
  } catch (err) {
    throw new Error('FS operation failed');
  }
};

try {
  await list();
} catch (err) {
  throw err;
}
