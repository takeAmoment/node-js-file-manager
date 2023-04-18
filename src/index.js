import { findArgs } from "./findArgs.js";
import { stdout, stdin } from "process";
import path, { isAbsolute } from "path";
import os from "os";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const argsObject = findArgs();
const user = argsObject["username"];
const username = user.slice(0, 1).toUpperCase() + user.slice(1)

const findWorkingDirectory = () => {
  return process.cwd();
}

const showWorkingDirectory = () => {
  stdout.write(`You are currently in ${findWorkingDirectory()}\n`);
}

const exitFromProcess = () => {
  stdout.write(`\nThank you for using File Manager, ${username}, goodbye!\n`);
  process.exit();
}

stdout.write(`Welcome to the File Manager, ${username}!\n`);
showWorkingDirectory();


stdin.on('data', (data) => {
  const str = data.toString().trim();

  if (str === ".exit") {
    exitFromProcess();
  }

  const command = str.split(' ')[0];
  const args = str.split(' ').slice(1);

  switch (command) {
    case "up": 
      const homedir = os.homedir();
      if (findWorkingDirectory() !== homedir) {
        process.chdir('..');
        showWorkingDirectory();
      } else {
        stdout.write('Invalid input\n');
      }
      break;
    default: 
      stdout.write('Invalid input\n');
  }
});

process.on("SIGINT", () => exitFromProcess());

