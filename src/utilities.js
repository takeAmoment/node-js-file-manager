import path from 'path';
import fs from 'fs/promises';

export const checkisAbsolutePath = (pathName) => {
  return path.isAbsolute(pathName);
} 

export const checkIsExist = async (fullPath) => {
  try {
    await fs.access(fullPath);
    return true;
  } catch (error) {
    return false;
  }
}

export const createFilePath = (workingDirectory, filePath) => {
  const filePathIsAbsolute = checkisAbsolutePath(filePath);
  let fullFilePath;

  if (filePathIsAbsolute) {
    fullFilePath = filePath;
  } else {
    fullFilePath = path.resolve(workingDirectory, filePath);
  }
  
  return fullFilePath;
};