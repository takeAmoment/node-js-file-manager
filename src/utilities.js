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
