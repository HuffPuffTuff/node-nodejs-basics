import { createHash } from 'node:crypto';
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const filePath = resolve(__dirname, 'files', 'fileToCalculateHashFor.txt');
  const buff = await fs.readFile(filePath);
  const hash = createHash('sha256').update(buff).digest('hex');
  console.log(hash);
};

await calculateHash();
