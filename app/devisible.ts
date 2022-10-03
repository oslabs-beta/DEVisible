import fs from 'fs';
import { promisify } from 'util';
import fetch from 'node-fetch';
import { spawn } from 'child_process';
import { parse } from 'ts-command-line-args';
import { gitToJs } from 'git-parse';
import fastFolderSize from 'fast-folder-size';

const art = `
██████████████████▓▓▒▒░░░░░░░░░░
███████████████████████▓▒░░░░░░░
██████████████████████████▓░░░░░
████████████████████████████▒░░░
████████████▓▒▒▒▒▒▒▓█████████▓░░
██████████▒▒▒▒▒▒▒▓▓▓▒▒████████▒░
█████████░▒░░▒▓▓▓▓▓▓▓▓▒▓██████▓░
████████▒▓░░▓▓▓▓██▓▓▓▓▓░███████░
████████▒▓▒▓▓▓████▓▓▓▓▓░███████░
████████▓▒▓▓▓▓▓▓▓▓▓▓▓▓▒▓███████░
████████▓░░▓▓▓▓▓▓▓▓▓▓▒▓███████▓░
██████▒▒▓██▓▒▒▒▒▒▒▒▒▓█████████░░
███▓▒▒███████████████████████▒░░
▓▒▒▓████████████████████████▒░░░
▒█████████████████████████▒░░░░░
███████████████████████▓▒░░░░░░░
`;

interface Arguments {
  apiKey: string;
  buildPath: string;
  command: string;
  url?: string;
  help?: boolean;
}

const { apiKey, url, buildPath, command } = parse<Arguments>(
  {
    apiKey: { type: String, alias: 'k' },
    url: {
      type: String,
      alias: 'u',
      optional: true,
      defaultValue: 'localhost',
    },
    buildPath: { type: String, alias: 'p' },
    command: { type: String, alias: 'c' },
    help: {
      type: Boolean,
      optional: true,
      alias: 'h',
      description: 'Prints this usage guide',
    },
  },
  {
    helpArg: 'help',
  }
);
function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const sendData = async (buildTime: number) => {
  // getFolderSize(buildPath, (err, size) => console.log(size));
  const buildSize = await calculateBuildSize();

  async function calculateBuildSize() {
    const getFolderSize = promisify(fastFolderSize);
    try {
      const size = await getFolderSize(buildPath);
      console.log('Build size: ' + formatBytes(size!));
      return size;
    } catch (err) {
      console.error('Error reading build directory: ' + err);
    }
  }
};

const start = Date.now();

const commandArr = command.split(' ');
const buildProc = spawn(commandArr[0], commandArr.slice(1));

buildProc.stdout.on('data', (data) => {
  console.log(data);
});

buildProc.stderr.on('data', (data) => {
  console.log({ data });
});

buildProc.on('close', (code) => {
  console.log(`build completed with code ${code}`);
  const buildTime = Date.now() - start;
  console.log(`Build time: ${buildTime}ms`);
  sendData(buildTime);
});
