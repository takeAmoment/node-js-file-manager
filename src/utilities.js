import path from 'path';
import fs from 'fs/promises';

export const findArgs = () => {
  let argsObject = {};
  const args = process.argv.slice(2);

  args.forEach((arg) => {
      if (arg.startsWith("--")){
        const argArr = arg.split("=");
        const key = argArr[0].slice(2);
        const value = argArr[1];
        argsObject[key]=value;
      } else {
        throw new Error('Incorrect input');
      }
  });
  
  return argsObject;
}

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