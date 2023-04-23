import path from 'path';
import fs from 'fs/promises';

export const addFile =  async (workingDirectory, fileName) => {
  if (!fileName) {
    console.log('Invalid input');
    return;
  }
  
  const filePath = path.resolve(workingDirectory, fileName);

  try {
    await fs.writeFile(filePath, '');
    
  } catch (error) {
    console.log('Operation failed');
  }
}