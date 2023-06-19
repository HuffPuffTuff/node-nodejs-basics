import { fileURLToPath } from 'url';
import { resolve } from 'path';

import { spawn } from 'child_process';

const spawnChildProcess = async (args) => {
  const __dirname = fileURLToPath(new URL('.', import.meta.url));
  const scriptPath = resolve(__dirname, 'files', 'script.js');

  const childProcess = spawn('node', [scriptPath], {
    stdio: ['pipe', 'pipe', process.stderr],
  });

  process.stdin.pipe(childProcess.stdin);

  childProcess.stdout.pipe(process.stdout);

  childProcess.stdin.write(JSON.stringify(args));
  childProcess.stdin.end();

  childProcess.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(['someArgument1', 'someArgument2', 'someArgument3']);
