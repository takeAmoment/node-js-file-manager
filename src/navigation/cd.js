export const goToTheDir = async (dirPath) => {
  try {
    process.chdir(dirPath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('Operation failed: there is not such directory');
    }
  }
}