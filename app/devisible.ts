import { spawn } from 'cross-spawn';
import fastFolderSize from 'fast-folder-size';
import fs from 'fs';
import { gitToJs } from 'git-parse';
import fetch from 'node-fetch';
import path from 'path';
import { parse } from 'ts-command-line-args';
import { promisify } from 'util';

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
  gitRoot?: string;
  packageFile?: string | undefined;
  url?: string;
  help?: boolean;
}

interface Dependency {
  name: string;
  version: string;
  isDevDependency: boolean;
}

let { apiKey, url, buildPath, command, gitRoot, packageFile } =
  parse<Arguments>(
    {
      apiKey: { type: String, alias: 'k' },
      url: {
        type: String,
        alias: 'u',
        optional: true,
        defaultValue: 'http://localhost:3000',
      },
      buildPath: { type: String, alias: 'b' },
      command: { type: String, alias: 'c' },
      gitRoot: {
        type: String,
        alias: 'g',
        optional: true,
        defaultValue: process.cwd(),
      },
      packageFile: {
        type: String,
        alias: 'p',
        optional: true,
        defaultValue: '',
      },
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
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

const sendData = async (buildTime: number) => {
  const buildSize = await calculateBuildSize();
  const { name, dependencies } = await parsePackageJson();
  const { hash } = await parseGitRepo();
  console.log(
    JSON.stringify(
      {
        apiKey,
        buildTime,
        buildSize,
        dependencies,
        repoName: name,
        lastCommitHash: hash,
      },
      null,
      2
    )
  );

  const res = await fetch(`${url}/app`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      apiKey,
      buildTime,
      buildSize,
      dependencies,
      repoName: name,
      commitHash: hash,
    }),
  });

  console.log(res);
  if (res.status === 200 || res.status === 201) {
    const data = await res.json();
    console.log(data);
    process.exit(0);
  }
};

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

async function parsePackageJson(): Promise<{
  name: string;
  dependencies: Dependency[];
}> {
  let file;
  if (!packageFile) packageFile = path.resolve(process.cwd(), './package.json');
  try {
    file = await fs.promises.readFile(packageFile, { encoding: 'utf-8' });
    const packageJson = JSON.parse(file);
    return {
      name: packageJson.name,
      dependencies: Object.entries<string>(packageJson.dependencies)
        .map(([name, version]) => {
          return { name, version, isDevDependency: false };
        })
        .concat(
          Object.entries<string>(packageJson.devDependencies).map(
            ([name, version]) => {
              return { name, version, isDevDependency: true };
            }
          )
        ),
    };
  } catch {
    throw new Error(
      `Error parsing package.json. 
      If this package is not being called from the project root, please specify it as an argument`
    );
  }
}

// currently only parsing the true package.json
// if we want to try to parse the various types of lockfile, the skeleton is here
// ↓↓↓

// async function parseLockfile() {
//   let file: string;
//   let type: 'JSON' | 'YAML' | undefined;
//   if (lockfile) {
//     file = await fs.promises.readFile(lockfile, { encoding: 'utf-8' });
//   }
//   // if the user hasn't manually specified their lockfile to parse dependencies, we'll look for it ourselves
//   if (!lockfile) {
//     const packageLockPromise = fs.promises.readFile('./package-lock.json', {
//       encoding: 'utf-8',
//     });
//     const yarnLockPromise = fs.promises.readFile('./yarn.lock', {
//       encoding: 'utf-8',
//     });

//     const [packageLock, yarnLock] = await Promise.allSettled([
//       packageLockPromise,
//       yarnLockPromise,
//     ]);
//     if (packageLock.status === 'fulfilled' && yarnLock.status === 'fulfilled')
//       throw new Error(
//         'Multiple lockfiles found! Please specify the lockfile to use as a command line argument'
//       );
//     // file = packageLock.status === 'fulfilled' ? packageLock.value : yarnLock.value
//     if (packageLock.status === 'fulfilled') {
//       file = packageLock.value;
//       type = 'JSON';
//     } else if (yarnLock.status === 'fulfilled') {
//       file = yarnLock.value;
//       type = 'YAML';
//     } else
//       throw new Error(
//         `Error reading lockfile. DEVisible supports package-lock.json and yarn.lock.
//          Please call this program from the folder that the lockfile resides in or pass an absolute path to the lockfile as an argument.`
//       );
//     console.log(file);
//     if (type === 'JSON') {
//       return JSON.parse(file).packages.map((pkg) => {
//         if (pkg) return { [pkg]: pkg.version };
//       });
//     }
//   }
// }

const parseGitRepo = async () => {
  try {
    const commits = await gitToJs(gitRoot!);
    const { hash } = commits[0];
    return { hash };
  } catch {
    throw new Error(
      'Error reading Git history. If this package is not being called from the git root, please specify it as an argument'
    );
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
  if (code !== 0) throw new Error('Build failed! Aborting data gathering...');
  const buildTime = Date.now() - start;
  console.log(`Build time: ${buildTime}ms`);
  sendData(buildTime);
});
