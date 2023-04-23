import path from 'path';
import fs from 'fs/promises';
import { createFilePath } from '../utilities.js'; 

export const renameFile = async (workingDirectory, props) => {
  if (props.length < 2) {
    console.log('Input invalid');
    return;
  }
  const filePath = props[0];
  const newFileName = props[1];

  const oldPath = createFilePath(workingDirectory, filePath);

  const newPath = path.resolve(path.dirname(oldPath), newFileName);

  try {
    await fs.rename(oldPath, newPath)
  } catch (error) {
    console.log('Operation failed: there is not such file');
  }

} 