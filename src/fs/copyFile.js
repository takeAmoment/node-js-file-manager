import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream/promises';
import { checkIsExist, checkisAbsolutePath, createFilePath } from '../utilities.js';

const createPathToNewFile = (workingDirectory, pathToDirectory, fileName) => {
  const pathToDirectoryIsAbsolute = checkisAbsolutePath(pathToDirectory);
  let pathToNewFile;

  if (pathToDirectoryIsAbsolute) {
    pathToNewFile = path.resolve(pathToDirectory, filePath);
  } else {
    pathToNewFile = path.resolve(workingDirectory, `${pathToDirectory}/${fileName}`);
  }

  return pathToNewFile;
}

export const copyFile = async (workingDirectory, props) => {
  if (props.length < 2) {
    console.log('Operation failed');
    return;
  }

  const filePath = path.normalize(props[0]);
  const pathToDirectory = path.normalize(props[1]);
  const fileName = path.basename(filePath);

  let fullFilePath = createFilePath(workingDirectory, filePath);
  let pathToNewFile = createPathToNewFile(workingDirectory, pathToDirectory, fileName);

  const isFileExist = await checkIsExist(fullFilePath);
  const isNewFileExist = await checkIsExist(pathToNewFile);

  if(!isFileExist) {
    console.log('Operation failed: this file does not exist');
    return;
  }

  if(isNewFileExist) {
    console.log('Operation failed: this file alredy exists');
    return;
  }

  try {
    const readableStream = fs.createReadStream(fullFilePath, 'utf-8');
    const writableStream = fs.createWriteStream(pathToNewFile);

    await pipeline(readableStream, writableStream);

  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Operation failed: this file or directory does not exist');
    } else {
      console.log(error);
    }
    return;
  }

  return fullFilePath;
}