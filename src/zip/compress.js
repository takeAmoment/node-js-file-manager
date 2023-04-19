import path from 'path';
import fs from 'fs';
import { stat } from 'fs/promises';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { createFilePath } from '../utilities.js';

const checkIsFile = async (filePath) => {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      return true;
    }
    return false;
  }
};

export const compress = async (workingDirectory, props) => {
  if (props.length < 2) {
    console.log('Invalid input');
    return;
  }

  const sourcePath = path.normalize(props[0]);
  const destinationPath = path.normalize(props[1]);

  const fullSourcePath = createFilePath(workingDirectory, sourcePath);
  const fullDestinationPath = createFilePath(workingDirectory, destinationPath);

  const isSourceFile = await checkIsFile(fullSourcePath);
  const isDestinationFile = await checkIsFile(fullDestinationPath);

  if (!isSourceFile || !isDestinationFile) {
    console.log('Operation failed: fileName is absent');
    return;
  }

  try {
    const gzip = zlib.createBrotliCompress();
    const readableStream = fs.createReadStream(fullSourcePath, 'utf-8');
    const writableStream = fs.createWriteStream(fullDestinationPath);

    await pipeline(readableStream, gzip, writableStream);
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Operation failed: this file or directory does not exist');
    } 
  }
};