import { findArgs } from "./utilities.js";
import { stdout, stdin } from "process";
import os from "os";
import { goToTheDir } from "./navigation/cd.js";
import { goUp } from "./navigation/up.js";
import { getList } from './fs/getList.js';
import { catFile } from './fs/catFile.js';
import { addFile } from "./fs/addFile.js";
import { renameFile } from './fs/renameFile.js';
import { copyFile } from "./fs/copyFile.js";
import { moveFile } from "./fs/moveFile.js";
import { removeFile } from "./fs/removeFile.js";
import { getOsInfo } from "./os/getOsInfo.js";
import { getHash } from "./hash/getHash.js";
import { compress } from './zip/compress.js';
import { decompress } from "./zip/decompress.js";

const argsObject = findArgs();
const user = argsObject["username"];
const username = user.slice(0, 1).toUpperCase() + user.slice(1)
const homedir = os.homedir();

process.chdir(homedir);

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


stdin.on('data', async (data) => {
  const str = data.toString().trim();

  if (str === ".exit") {
    exitFromProcess();
  }

  const command = str.split(' ')[0];
  const args = str.split(' ').slice(1);

  switch (command) {
    case "up": 
      goUp(findWorkingDirectory(), homedir);
      showWorkingDirectory();
      break;
    case "cd": 
      const dirParth = args[0];
      await goToTheDir(dirParth);
      showWorkingDirectory(); 
      break;
    case "ls": 
      await getList(findWorkingDirectory());
      showWorkingDirectory(); 
      break;
    case "cat":
      await catFile(findWorkingDirectory(), args[0], showWorkingDirectory);
      break;
    case "add":
      await addFile(findWorkingDirectory(), args[0]);
      showWorkingDirectory();
      break;
    case "rn":
      await renameFile(findWorkingDirectory(), args);
      showWorkingDirectory();
      break;
    case "cp":
      await copyFile(findWorkingDirectory(), args);
      showWorkingDirectory();
      break;
    case "mv":
      await moveFile(findWorkingDirectory(), args);
      showWorkingDirectory();
      break;
    case "rm":
      await removeFile(findWorkingDirectory(), args[0]);
      showWorkingDirectory();
      break;
    case "os":
      await getOsInfo(args[0]);
      showWorkingDirectory();
      break;
    case "hash":
      await getHash(findWorkingDirectory(), args[0], showWorkingDirectory);
      break;
    case "compress":
      await compress(findWorkingDirectory(), args);
      showWorkingDirectory();
      break;
    case "decompress":
      await decompress(findWorkingDirectory(), args);
      showWorkingDirectory();
      break;
    default: 
      stdout.write('Invalid input\n');
      showWorkingDirectory();
  }
});

process.on("SIGINT", () => exitFromProcess());

