import fs from 'fs';
import { stdout } from 'process';
import { createFilePath } from '../utilities.js';

export const catFile = async (workingDirectory, pathToFile, showWorkingDirectory) => {
  if (!pathToFile) {
    console.log('Invalid input');
    return;
  }

  try {
    const filePath = createFilePath(workingDirectory, pathToFile);
    const readableStream = fs.createReadStream(filePath, 'utf-8');

    readableStream.on('data', (data) => {
      stdout.write(`${data}\n`);
    });

    readableStream.on('end', () => {
      showWorkingDirectory();
    });
  
    readableStream.on('error', (error) => {
      console.log('Operation failed');
    });

  } catch (error) {
    console.log(`Operation failed: ${error}`);
  }
}