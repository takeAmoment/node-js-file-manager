import fs from 'fs/promises';
import { copyFile  } from './copyFile.js';

export const moveFile = async (workingDirectory, props) => {
  const fullFilePath = await copyFile(workingDirectory, props);

  if (!fullFilePath) {
    return;
  }

  try {
    await fs.rm(fullFilePath);
  } catch (error) {
    console.log(`Operation failed: ${error}`);
  }
};