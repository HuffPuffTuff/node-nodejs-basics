import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { Writable } from 'stream';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const write = async () => {
  const filePath = resolve(__dirname, 'files', 'fileToWrite.txt');
  const writableStream = createWriteStream(filePath, 'utf-8');

  const { stdin, stdout } = process;

  const exitCommand = ['exit'];

  stdin.on('data', (data) => {
    const buffer = data.toString().trim();

    if (exitCommand.includes(buffer)) {
      process.exit();
    } else {
      writableStream.write(data);
      stdout.write('Hi, write your text: ');
    }
  });

  process.on('exit', () => stdout.write('By, by'));

  process.on('SIGINT', () => {
    stdout.write('By, by');
  });
};

await write();
