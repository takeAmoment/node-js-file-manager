import path from 'path';
import fs from 'fs/promises';
import { checkisAbsolutePath, checkIsExist } from '../utilities.js'; 

export const renameFile = async (workingDirectory, props) => {
  if (props.length < 2) {
    console.log('Operation failed');
    return;
  }
  const filePath = props[0];
  const newFileName = props[1];

  const isAbsolute = checkisAbsolutePath(filePath);
  let oldPath;

  if (isAbsolute) {
     oldPath = path.resolve(filePath);
  } else {
     oldPath = path.resolve(workingDirectory, filePath);
  }

  // await checkIsExist(oldPath);

  const newPath = path.resolve(path.dirname(oldPath), newFileName);

  // await checkIsExist(newPath);

  try {
    await fs.rename(oldPath, newPath)
  } catch (error) {
    console.log('Operation failed');
  }

} 