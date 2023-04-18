import path from 'path';
import fs from 'fs/promises';

export const checkisAbsolutePath = (pathName) => {
  return path.isAbsolute(pathName);
} 

export const checkIsExist = async (fullPath) => {
  try {
    await fs.access(fullPath);
  } catch (error) {
    console.log('Operation failed. This file does not exist.');
    return;
  }
}