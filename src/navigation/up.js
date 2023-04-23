export const goUp = (workingDirectory, homedir) => {
  if (workingDirectory !== homedir) {
    process.chdir('..');
  } else {
    console.log('Invalid input: you are in the root folder\n');
  }
}