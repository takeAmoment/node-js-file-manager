import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createFilePath, checkIsExist } from '../utilities.js';

export const getHash = async (workingDirectory, filePath, showWorkingDirectory) => {
  if (!filePath) {
    console.log('Invalid input');
    return;
  }
  const fullFilePath = createFilePath(workingDirectory, path.normalize(filePath));

  try {
    const hash = crypto.createHash('sha256');
    const readableStream = fs.createReadStream(fullFilePath, 'utf-8');

    readableStream.on('data', (data) => {
      hash.update(data);
    });

    readableStream.on('end', () => {
      const fileHash = hash.digest('hex');
      console.log(`File hash: ${fileHash}`);
    });

    readableStream.on('error', (error) => {
      if (error.code === 'ENOENT') {
        console.log('Operation failed: this file or directory does not exist');
      } 
    });
    
  } catch (error) {
    console.log(`Operation failed: ${error}`);
  }
  showWorkingDirectory();
};