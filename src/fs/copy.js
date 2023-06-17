import { resolve, join } from 'path';
import { promises as fs, copyFile } from 'fs';
import { fileURLToPath } from 'url';

const copy = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const filesFolderPath = resolve(__dirname, 'files');
  const filesCopyFolderPath = resolve(__dirname, 'files_copy');

  try {
    await fs.mkdir(join(filesCopyFolderPath));

    const files = await fs.readdir(filesFolderPath);

    files.forEach((file) => {
      const filePath = resolve(filesFolderPath, file);
      const copyPath = resolve(filesCopyFolderPath, file);

      copyFile(filePath, copyPath, (err) => {
        if (err) throw err;
        console.log(`/files/${file} was copied to /files-copy/${file}`);
      });
    });
  } catch (err) {
    if (err) throw new Error('FS operation failed');
  }
};

try {
  await copy();
} catch (err) {
  throw err;
}
