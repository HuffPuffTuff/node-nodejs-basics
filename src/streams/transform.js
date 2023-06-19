import { Transform } from 'stream';

const { stdin, stdout } = process;

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split('').reverse().join('');
      this.push(reversedChunk);
      callback();
    },
  });

  stdin.pipe(reverseStream).pipe(stdout);
};

await transform();
