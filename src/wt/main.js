import { Worker } from 'worker_threads';
import os from 'os';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const performCalculations = async () => {
  const cores = os.cpus().length;
  const results = {};
  let completedWorkers = 0;

  const handleMessage = (message) => {
    console.log(
      `Received result from Worker ${message.threadId}:`,
      message.result
    );
    results[message.threadId] = message.result;
    completedWorkers += 1;

    if (completedWorkers === cores) {
      const finalResults = Array.from(
        { length: cores },
        (val, i) => results[i + 1]
      );
      console.log('Final results:', finalResults);
    }
  };

  const workerPath = path.resolve(__dirname, 'worker.js');

  for (let i = 0; i < cores; i += 1) {
    const worker = new Worker(workerPath);
    const data = 10 + i;
    worker.postMessage(data);

    worker.on('message', (result) => {
      handleMessage({ threadId: worker.threadId, result });
    });

    worker.on('error', (error) => {
      handleMessage({ threadId: worker.threadId, result: null });
      console.error(`Error in Worker ${worker.threadId}:`, error);
    });
  }

  console.log(`Created ${cores} worker threads.`);
};

await performCalculations();
