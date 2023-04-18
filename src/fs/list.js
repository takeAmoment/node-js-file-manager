import { readdir } from 'fs/promises';

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
      } else {
        throw new Error(`${file.name} is not a file or directory`);
      }
      results.push(obj);
    })

    console.table(results);
  } catch (error) {
    console.log(error);
  }
}