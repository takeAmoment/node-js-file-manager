import { findArgs } from "./findArgs.js";
import { stdout, stdin } from "process";

const argsObject = findArgs();
const user = argsObject["username"];
const username = user.slice(0, 1).toUpperCase() + user.slice(1)

const exitFromProcess = () => {
  stdout.write(`\nThank you for using File Manager, ${username}, goodbye!\n`);
  process.exit();
}

stdout.write(`Welcome to the File Manager, ${username}!\n`);

stdin.on('data', (data) => {
  console.log(data.toString());
});

process.on("SIGINT", () => exitFromProcess());

