import path from 'path';
import fs from 'fs/promises';
import { createFilePath } from '../utilities.js';

export const removeFile = async (workingDirectory, filePath) => {
  const pathToFile = path.normalize(filePath);

  let fullFilePath = createFilePath(workingDirectory, pathToFile);

  try {
    await fs.rm(fullFilePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Operation failed: this file or directory does not exist');
    } else {
      console.log(error);
    }
  }
};