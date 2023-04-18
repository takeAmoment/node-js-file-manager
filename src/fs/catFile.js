import fs from 'fs';
import path from 'path';
import { stdout } from 'process';

export const catFile = async (workingDirectory, pathToFile, showWorkingDirectory) => {
  const filePath = path.resolve(workingDirectory, pathToFile);
  try {
    const readableStream = fs.createReadStream(filePath, 'utf-8');

    readableStream.on('data', (data) => {
      stdout.write(`${data}\n`);
    });

    readableStream.on('end', () => {
      showWorkingDirectory();
    });
  
    readableStream.on('error', (error) => {
      console.log('Operation is failed');
    });

  } catch (error) {
    console.log(error);
  }
}