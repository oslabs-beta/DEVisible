import getFolderSize from 'get-folder-size';
import { parse } from 'ts-command-line-args';
import { gitToJs } from 'git-parse';

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
  url?: string;
  help?: boolean;
}

const args = parse<Arguments>(
  {
    apiKey: String,
    url: { type: String, optional: true },
    buildPath: String,
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
console.log(art);

console.log(args);
