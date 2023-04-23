export const goToTheDir = async (dirPath) => {
  if (!dirPath) {
    console.log('Invalid input');
  }
  
  try {
    process.chdir(dirPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Operation failed: there is not such directory');
    }
  }
}