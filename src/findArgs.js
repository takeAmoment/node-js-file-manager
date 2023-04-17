export const findArgs = () => {
  let argsObject = {};
  const args = process.argv.slice(2);

  args.forEach((arg) => {
      if (arg.startsWith("--")){
        const argArr = arg.split("=");
        const key = argArr[0].slice(2);
        const value = argArr[1];
        argsObject[key]=value;
      }
  });
  
  return argsObject;
}