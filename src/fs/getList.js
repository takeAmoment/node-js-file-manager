import { readdir } from 'fs/promises';

const sortResult = (results) => {
  results.sort((a, b) => {
    if (a.type < b.type) {
      return -1;
    } else if (a.type > b.type) {
      return 1;
    } else {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    }
  });
};

export const getList = async (workingDirectory) => {
  const dirName = workingDirectory;
  const results = [];

  try {
    const files = await readdir(dirName, { withFileTypes: true });
    files.forEach((file) => {
      let obj = {};

      obj["name"] = file.name;
      if (file.isDirectory()) {
        obj["type"] = "directory";
      } else if (file.isFile()) {
        obj["type"] = "file";
      } 
      results.push(obj); 
    })
    sortResult(results);
    console.table(results);
  } catch (error) {
    console.log(`Operation failed: ${error}`);
  }
}